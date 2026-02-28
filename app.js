// Minimal JS to support interactions (works with your existing HTML)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const btnPrint = document.getElementById("btnPrint");
btnPrint?.addEventListener("click", () => window.print());

const expandAll = document.getElementById("expandAll");
const collapseAll = document.getElementById("collapseAll");
const toggleTheme = document.getElementById("toggleTheme");

const accordions = () => Array.from(document.querySelectorAll("details.accordion"));

expandAll?.addEventListener("click", () => {
  accordions().forEach(d => d.open = true);
});

collapseAll?.addEventListener("click", () => {
  accordions().forEach(d => d.open = false);
});

// Optional: theme toggle (light/dark). Minimal + Apple-like.
toggleTheme?.addEventListener("click", () => {
  document.documentElement.classList.toggle("force-dark");
});

// If user toggles, respect it by overriding prefers-color-scheme:
const style = document.createElement("style");
style.textContent = `
  .force-dark{
    color-scheme: dark;
  }
  .force-dark:root{
    --bg: #0b0b0f;
    --surface: rgba(20,20,26,.78);
    --surface-2: rgba(20,20,26,.62);
    --text: #f5f7ff;
    --muted: rgba(245,247,255,.68);
    --line: rgba(255,255,255,.10);
    --shadow-sm: 0 1px 2px rgba(0,0,0,.4);
    --shadow: 0 14px 40px rgba(0,0,0,.45);
  }
`;
document.head.appendChild(style);
