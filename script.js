// 年の自動更新
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// モバイルナビ
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

// スクロールでセクションをふわっと表示
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


// ------------------------------
// GitHub API から最新4リポジトリ取得
// ------------------------------

async function loadLatestRepos() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  const url =
    "https://api.github.com/users/frisk-V3/repos?sort=created&direction=desc";

  try {
    const res = await fetch(url);
    const repos = await res.json();

    // 最新4つだけ
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
