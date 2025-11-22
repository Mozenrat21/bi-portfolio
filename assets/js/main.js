document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const searchInput = document.getElementById("project-search");
  const chips = document.querySelectorAll("#tech-filters .chip");
  const cards = document.querySelectorAll("#projects-grid .project-card");

  if (!searchInput || !chips.length || !cards.length) return;

  let activeTech = "all";

  const applyFilters = () => {
    const q = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const tech = (card.dataset.tech || "").toLowerCase();
      const title = card.dataset.title || "";
      const descr = card.dataset.description || "";

      const matchText =
        !q || title.includes(q) || descr.includes(q);

      const matchTech =
        activeTech === "all" ||
        tech.split(",").map(s => s.trim().toLowerCase()).includes(activeTech.toLowerCase());

      card.style.display = matchText && matchTech ? "" : "none";
    });
  };

  searchInput.addEventListener("input", applyFilters);

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");
      activeTech = chip.dataset.tech || "all";
      applyFilters();
    });
  });
});
