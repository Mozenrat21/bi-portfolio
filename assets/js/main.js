// Дані проєктів — тут додаєш / редагуєш свої кейси
const PROJECTS = [
  {
    id: "reclamation",
    title: "Reclamation Analytics Dashboard",
    meta: "Power BI · SQL Server · Retail service",
    description:
      "End-to-end BI solution to track reclamation requests, SLA, overdue cases and financial impact per branch, supplier and product group.",
    tags: ["Power BI", "SQL", "Retail", "Operations"],
    // для фільтрів
    filters: ["powerbi", "sql", "operations"],
    image: "assets/img/projects/reclamation.png",
    links: {
      live: "#", // TODO: link на Power BI або інший хостинг
      caseStudy: "#", // TODO: стаття в блозі / Notion
      repo: "" // якщо є окремий репо
    }
  },
  {
    id: "available-registers",
    title: "Cash Registers Availability Monitoring",
    meta: "Power BI · SSRS · Operations",
    description:
      "Monitoring of SCO and POS availability: incidents, downtime reasons and branches with the highest business risk.",
    tags: ["Power BI", "SSRS", "Incidents", "Operations"],
    filters: ["powerbi", "operations"],
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "cleaning-services",
    title: "Cleaning Services Performance",
    meta: "Power BI · Data modelling",
    description:
      "Analytics for cleaning requests and schedules: load per store, contractors performance and SLA breaches by zone and time.",
    tags: ["Power BI", "Operations"],
    filters: ["powerbi", "operations"],
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "cllll",
    title: "Cleaning Services Performance",
    meta: "Power BI · Data modelling",
    description:
      "Analytics for cleaning requests and schedules: load per store, contractors performance and SLA breaches by zone and time.",
    tags: ["Power BI", "Operations"],
    filters: ["powerbi", "operations"],
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "clelll",
    title: "Cleaning Services Performance",
    meta: "Power BI · Data modelling",
    description:
      "Analytics for cleaning requests and schedules: load per store, contractors performance and SLA breaches by zone and time.",
    tags: ["Power BI", "Operations"],
    filters: ["powerbi", "operations"],
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "ccccc",
    title: "Cleaning Services Performance",
    meta: "Power BI · Data modelling",
    description:
      "Analytics for cleaning requests and schedules: load per store, contractors performance and SLA breaches by zone and time.",
    tags: ["Power BI", "Operations"],
    filters: ["powerbi", "operations"],
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  }
  // Далі спокійно додаєш ще 10+ проєктів у такому ж форматі
];

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.getElementById("projects-grid");
  const searchInput = document.getElementById("project-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let activeFilter = "all";

  function renderProjects(list) {
    if (!grid) return;

    if (!list.length) {
      grid.innerHTML =
        '<p style="color:#b0b3c1;font-size:0.9rem;">Nothing found. Try another search or filter.</p>';
      return;
    }

grid.innerHTML = list
  .map((p) => {
    const tagsHtml = p.tags
      .map((tag) => `<span class="project-card__tag">${tag}</span>`)
      .join("");

    const links = [];
    if (p.links.live)
      links.push(
        `<a href="${p.links.live}" target="_blank">🔗 View live dashboard</a>`
      );
    if (p.links.caseStudy)
      links.push(
        `<a href="${p.links.caseStudy}" target="_blank">📄 Case study</a>`
      );
    if (p.links.repo)
      links.push(
        `<a href="${p.links.repo}" target="_blank">💻 Source</a>`
      );

    const linksHtml = links.length
      ? `<div class="project-card__links">${links.join(" · ")}</div>`
      : "";

    // 👇 НОВЕ: блок із картинкою (якщо є)
    const imageHtml = p.image
      ? `
        <div class="project-card__thumb">
          <img src="${p.image}" alt="${p.title} dashboard" />
        </div>
      `
      : "";

    return `
      <article class="project-card">
        ${imageHtml}
        <h3 class="project-card__title">${p.title}</h3>
        <div class="project-card__meta">${p.meta}</div>
        <p class="project-card__descr">${p.description}</p>
        <div class="project-card__tags">${tagsHtml}</div>
        ${linksHtml}
      </article>
    `;
  })
  .join("");
  }

  function applyFilters() {
    const term = (searchInput?.value || "").trim().toLowerCase();

    const filtered = PROJECTS.filter((p) => {
      // фільтр по кнопці
      const byFilter =
        activeFilter === "all" || p.filters.includes(activeFilter);

      // пошук по назві / опису / meta / тегам
      const haystack = (
        p.title +
        " " +
        p.meta +
        " " +
        p.description +
        " " +
        p.tags.join(" ")
      ).toLowerCase();
      const bySearch = !term || haystack.includes(term);

      return byFilter && bySearch;
    });

    renderProjects(filtered);
  }

  // обробники фільтрів
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");
      activeFilter = btn.dataset.filter || "all";
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // перший рендер
  renderProjects(PROJECTS);
});
