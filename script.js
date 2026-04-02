/**
 * frisk-V3 Portfolio Script
 * ホワイトネオン・エディション
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 年の自動更新
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. モバイルナビゲーション
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("open");
    });

    // メニューリンククリックで閉じる
    navList.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navList.classList.remove("open");
      }
    });
  }

  // 3. 音楽プレイヤーの初期化
  initMusicPlayer();

  // 4. GitHubリポジトリの読み込み
  loadLatestRepos();

  // 5. スクロール表示アニメーション (Intersection Observer)
  initScrollReveal();
});

/**
 * 音楽プレイヤー設定
 * GitHubのリポジトリ内にある "music.mp3" を読み込みます
 */
function initMusicPlayer() {
  const audioPlayer = document.getElementById('portfolio-audio');
  if (!audioPlayer) return;

  // GitHubにアップロードしたファイル名に合わせて修正してください
  // 同じディレクトリにある場合は "music.mp3" でOK
  audioPlayer.src = "music.mp3";
  audioPlayer.load();

  // エラーハンドリング
  audioPlayer.onerror = () => {
    console.error("【Music Error】音源ファイルが見つかりません。ファイル名が 'music.mp3' か確認してください。");
  };

  // ブラウザの自動再生ブロック対策のログ
  console.log("Music Player Ready. Click anywhere on the page to enable audio.");
}

/**
 * GitHub API連携
 * 最新の4つのリポジトリを取得してカード形式で表示
 */
async function loadLatestRepos() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  const username = "frisk-V3"; // ユーザー名
  const url = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    
    const repos = await res.json();
    const latest = repos.slice(0, 4);

    container.innerHTML = ""; // 既存のコンテンツをクリア

    latest.forEach((repo) => {
      const created = new Date(repo.created_at);
      const dateStr = `${created.getFullYear()}/${created.getMonth() + 1}/${created.getDate()}`;

      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "No description available."}</p>
        <p class="meta">Created: ${dateStr}</p>
        <a href="${repo.html_url}" class="card-link" target="_blank">View on GitHub</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("GitHub API Error:", err);
    container.innerHTML = "<p>Failed to load repositories.</p>";
  }
}

/**
 * セクションのふわっと表示
 */
function initScrollReveal() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // 一度表示したら監視を終了
        }
      });
    },
    { 
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  sections.forEach((sec) => observer.observe(sec));
}
