(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const year = new Date().getFullYear();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(year);

  // Theme (persist)
  const themeKey = "suvneet_cv_theme";
  const saved = localStorage.getItem(themeKey);
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }

  const toggleThemeBtn = $("#toggleTheme");
  toggleThemeBtn?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(themeKey, next);
  });

  // Expand / Collapse all
  const allAccordions = $$("details.accordion");

  $("#expandAll")?.addEventListener("click", () => {
    allAccordions.forEach(d => d.open = true);
  });

  $("#collapseAll")?.addEventListener("click", () => {
    allAccordions.forEach(d => d.open = false);
    // keep summary accessible
    allAccordions[0]?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Print
  $("#btnPrint")?.addEventListener("click", () => window.print());

  // Subtle scroll reveal for accordions/cards
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.style.willChange = "transform, opacity";
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.08 });

  // Observe cards & accordions for little polish
  [...$$(".accordion"), ...$$(".card")].forEach(el => io.observe(el));

  // Keyboard UX: Enter/Space on details summary already works, but add focus ring
  $$("summary").forEach(s => {
    s.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        const details = s.parentElement;
        if (details?.tagName === "DETAILS") details.open = false;
      }
    });
  });
})();