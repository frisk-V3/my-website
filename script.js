// --- 基本機能: 年の自動更新 & モバイルナビ ---
document.addEventListener("DOMContentLoaded", () => {
  // 年の更新
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // モバイルナビの制御
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("open");
    });

    navList.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navList.classList.remove("open");
      }
    });
  }

  // 音楽プレイヤーの初期化
  initMusicPlayer();
});

// --- 視覚効果: スクロールでセクションをふわっと表示 ---
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((sec) => observer.observe(sec));

// --- 外部連携: GitHub API から最新リポジトリ取得 ---
async function loadLatestRepos() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  const url = "https://api.github.com/users/frisk-V3/repos?sort=created&direction=desc";

  try {
    const res = await fetch(url);
    const repos = await res.json();

    // 最新4つだけ表示
    const latest = repos.slice(0, 4);

    latest.forEach((repo) => {
      const created = new Date(repo.created_at);
      const updated = new Date(repo.updated_at);

      const createdStr = `${created.getFullYear()}/${created.getMonth() + 1}/${created.getDate()}`;
      const updatedStr = `${updated.getFullYear()}/${updated.getMonth() + 1}/${updated.getDate()}`;

      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "説明なし"}</p>
        <p class="meta">作成日: ${createdStr}</p>
        <p class="meta">更新日: ${updatedStr}</p>
        <a href="${repo.html_url}" class="card-link" target="_blank">GitHub を開く</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("GitHub API エラー:", err);
    container.innerHTML = "<p>リポジトリを読み込めませんでした。</p>";
  }
}

loadLatestRepos();

// --- 音楽機能: Base64オーディオの再生 ---
function initMusicPlayer() {
  const audioPlayer = document.getElementById('portfolio-audio');
  if (!audioPlayer) return;

  // frisk-V3 Original Track (Base64)
  // ※非常に長いため、末尾に配置しています
  const base64Music = "data:audio/mpeg;base64,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";

  audioPlayer.src = base64Music;
}
