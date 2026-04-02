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
  {
    threshold: 0.15,
  }
);

sections.forEach((sec) => observer.observe(sec));
