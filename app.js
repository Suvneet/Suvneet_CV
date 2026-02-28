// Interactive CV controls + tiny enhancements
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const details = $$(".accordion");
  const expandAllBtn = $("#expandAll");
  const collapseAllBtn = $("#collapseAll");
  const toggleThemeBtn = $("#toggleTheme");
  const printBtn = $("#btnPrint");

  // Expand/Collapse
  expandAllBtn?.addEventListener("click", () => {
    details.forEach(d => (d.open = true));
  });

  collapseAllBtn?.addEventListener("click", () => {
    details.forEach(d => (d.open = false));
    // keep the first "Summary" open for better UX (optional)
    const summary = $("#summary .accordion");
    if (summary) summary.open = true;
  });

  // Theme toggle (dark/light)
  const THEME_KEY = "suvneet_cv_theme";
  const applyTheme = (t) => {
    if (!t) document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  };

  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);

  toggleThemeBtn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "" : "light";
    applyTheme(next);
    if (next) localStorage.setItem(THEME_KEY, next);
    else localStorage.removeItem(THEME_KEY);
  });

  // Print / Save PDF
  printBtn?.addEventListener("click", () => window.print());

  // Smooth “active” feel: add a micro ripple-like highlight on click for buttons/chips
  const clickable = [...$$(".btn"), ...$$(".chip"), ...$$("summary.accordion__summary")];
  clickable.forEach(el => {
    el.addEventListener("click", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left;
      const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top;

      const halo = document.createElement("span");
      halo.style.position = "absolute";
      halo.style.left = `${x}px`;
      halo.style.top = `${y}px`;
      halo.style.width = "10px";
      halo.style.height = "10px";
      halo.style.borderRadius = "999px";
      halo.style.transform = "translate(-50%,-50%)";
      halo.style.pointerEvents = "none";
      halo.style.background = "radial-gradient(circle, rgba(39,210,255,.35), transparent 60%)";
      halo.style.filter = "blur(0px)";
      halo.style.opacity = "0.9";
      halo.style.transition = "transform 550ms cubic-bezier(.2,.8,.2,1), opacity 550ms cubic-bezier(.2,.8,.2,1)";
      halo.style.zIndex = "2";

      // ensure container is position:relative for absolute child
      const computed = getComputedStyle(el);
      if (computed.position === "static") el.style.position = "relative";
      el.appendChild(halo);

      requestAnimationFrame(() => {
        halo.style.transform = "translate(-50%,-50%) scale(18)";
        halo.style.opacity = "0";
      });

      setTimeout(() => halo.remove(), 600);
    });
  });

  // Mobile table: add labels for each cell when the header is hidden
  // (Only needed if you keep the current HTML table markup.)
  const rows = $$(".table .row:not(.head)");
  rows.forEach(row => {
    const cells = Array.from(row.children);
    const labels = ["Year", "Institute", "Degree", "Score"];
    cells.forEach((cell, i) => cell.setAttribute("data-label", labels[i] ?? ""));
  });
})();
