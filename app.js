// Suvneet — Interactive CV helpers

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch {}
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function setAllAccordions(open) {
  $$(".accordion").forEach(d => d.open = open);
}

function enhanceAccordions() {
  // Add subtle ripple highlight on summary click (keyboard-friendly)
  $$(".accordion__summary").forEach((summary) => {
    summary.addEventListener("click", () => {
      summary.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-1px)" }, { transform: "translateY(0)" }],
        { duration: 220, easing: "ease-out" }
      );
    });
  });
}

function init() {
  // year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // theme restore
  const stored = (() => { try { return localStorage.getItem("theme"); } catch { return null; }})();
  if (stored === "light" || stored === "dark") setTheme(stored);
  else setTheme("dark");

  // actions
  $("#toggleTheme")?.addEventListener("click", toggleTheme);
  $("#expandAll")?.addEventListener("click", () => setAllAccordions(true));
  $("#collapseAll")?.addEventListener("click", () => setAllAccordions(false));
  $("#btnPrint")?.addEventListener("click", () => window.print());

  enhanceAccordions();

  // Micro-interaction: animate stats on load
  const stats = $$(".stat");
  stats.forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 520, delay: 120 + i * 90, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
    );
  });
}

document.addEventListener("DOMContentLoaded", init);
