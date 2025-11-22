// Дані проєктів — тут додаєш / редагуєш свої кейси
const PROJECTS = [
  {
    id: "reclamation",
    title: "Reclamation Analytics Dashboard",
    meta: "Power BI · SQL Server · Retail service",
    description:
      "End-to-end BI solution to track reclamation requests, SLA, overdue cases and financial impact per branch, supplier and product group.",
    tags: ["Power BI", "SQL", "Retail", "Operations"],
    filters: ["powerbi", "sql", "operations"],
    image: "assets/img/projects/reclamation.png", // TODO: заміни на реальний скрін
    links: {
      live: "#",        // TODO: link на Power BI / інший хостинг
      caseStudy: "#",   // TODO: стаття в блозі / Notion
      repo: ""          // TODO: репозиторій, якщо буде
    }
  },
  {
    id: "available-registers",
    title: "Cash Registers Availability Monitoring",
    meta: "Power BI · SSRS · Operations",
    description:
      "Monitoring of SCO and POS availability: incidents, downtime reasons and branches with the highest business risk across stores.",
    tags: ["Power BI", "SSRS", "Incidents", "Operations"],
    filters: ["powerbi", "operations"],
    image: "assets/img/projects/available-registers.png",
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
    image: "assets/img/projects/cleaning-services.png",
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "service-desk",
    title: "Service Desk & Night Support Analytics",
    meta: "Power BI · SQL Server · ITSM",
    description:
      "Dashboard for monitoring Service Desk and Night Support workload, resolution times and SLA breaches by category, workgroup and schedule.",
    tags: ["Power BI", "SQL", "ITSM", "Incidents"],
    filters: ["powerbi", "sql", "operations"],
    image: "assets/img/projects/service-desk.png",
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "fire-safety",
    title: "Fire Safety Incidents Monitoring",
    meta: "Power BI · Reporting · Safety",
    description:
      "Reporting solution to track fire safety incidents, root causes, deadlines for investigation and reporting to authorities.",
    tags: ["Power BI", "Reporting", "Safety"],
    filters: ["powerbi", "operations"],
    image: "assets/img/projects/fire-safety.png",
    links: {
      live: "#",
      caseStudy: "",
      repo: ""
    }
  },
  {
    id: "data-platform-transport",
    title: "Data Platform Transport & Data Quality",
    meta: "SQL Server · ETL · Monitoring",
    description:
      "Monitoring of daily data transport jobs, load durations and data completeness for critical tables such as WO_Reclamation.",
    tags: ["SQL", "ETL", "Monitoring"],
    filters: ["sql"],
    image: "assets/img/projects/data-platform-transport.png",
    links: {
      live: "",
      caseStudy: "",
      repo: ""
    }
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
        if (p.links.live) {
          links.push(
            `<a href="${p.links.live}" target="_blank">🔗 View live dashboard</a>`
          );
        }
        if (p.links.caseStudy) {
          links.push(
            `<a href="${p.links.caseStudy}" target="_blank">📄 Case study</a>`
          );
        }
        if (p.links.repo) {
          links.push(
            `<a href="${p.links.repo}" target="_blank">💻 Source</a>`
          );
        }

        const linksHtml = links.length
          ? `<div class="project-card__links">${links.join(" · ")}</div>`
          : "";

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
