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
    image: "assets/img/projects/reclamation.png",
    links: {
      live: "#",
      caseStudy: "#",
      repo: ""
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
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.getElementById("projects-grid");
  const searchInput = document.getElementById("project-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // елементи модалки
  const modal = document.getElementById("project-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");
  const modalDescription = document.getElementById("modal-description");
  const modalTags = document.getElementById("modal-tags");
  const modalLinks = document.getElementById("modal-links");
  const modalCloseBtn = modal?.querySelector(".modal__close");
  const modalPrevBtn = document.getElementById("modal-prev");
  const modalNextBtn = document.getElementById("modal-next");

  let activeFilter = "all";
  let currentProjectIndex = -1; // індекс проєкту, відкритого в модалці

  function fillModal(project) {
    modalTitle.textContent = project.title;
    modalMeta.textContent = project.meta;
    modalDescription.textContent = project.description;

    if (project.image) {
      modalImage.src = project.image;
      modalImage.alt = project.title + " dashboard";
      modalImage.style.display = "block";
    } else {
      modalImage.style.display = "none";
    }

    modalTags.innerHTML = project.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    const links = [];
    if (project.links.live) {
      links.push(
        `<a href="${project.links.live}" target="_blank">🔗 View live dashboard</a>`
      );
    }
    if (project.links.caseStudy) {
      links.push(
        `<a href="${project.links.caseStudy}" target="_blank">📄 Case study</a>`
      );
    }
    if (project.links.repo) {
      links.push(
        `<a href="${project.links.repo}" target="_blank">💻 Source</a>`
      );
    }
    modalLinks.innerHTML = links.join(" · ");
  }

  function openProjectByIndex(index) {
    if (!modal) return;
    if (index < 0 || index >= PROJECTS.length) return;

    currentProjectIndex = index;
    const project = PROJECTS[index];

    fillModal(project);

    modal.classList.add("modal--open");
    document.body.style.overflow = "hidden";
  }

  function openProjectById(id) {
    const index = PROJECTS.findIndex((p) => p.id === id);
    if (index === -1) return;
    openProjectByIndex(index);
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("modal--open");
    document.body.style.overflow = "";
    currentProjectIndex = -1;
  }

  function showPrevProject() {
    if (currentProjectIndex === -1) return;
    const nextIndex =
      (currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    openProjectByIndex(nextIndex);
  }

  function showNextProject() {
    if (currentProjectIndex === -1) return;
    const nextIndex = (currentProjectIndex + 1) % PROJECTS.length;
    openProjectByIndex(nextIndex);
  }

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
          <article class="project-card" data-id="${p.id}">
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

    // клік по картці відкриває модалку (крім кліку по лінках)
    const cards = grid.querySelectorAll(".project-card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "a") return;

        const id = card.getAttribute("data-id");
        if (id) openProjectById(id);
      });
    });
  }

  function applyFilters() {
    const term = (searchInput?.value || "").trim().toLowerCase();

    const filtered = PROJECTS.filter((p) => {
      const byFilter =
        activeFilter === "all" || p.filters.includes(activeFilter);

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

  // фільтри
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

  // закриття модалки
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeProjectModal();
    });
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__backdrop")) {
        closeProjectModal();
      }
    });
  }

  // навігація в модалці
  if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevProject();
    });
  }
  if (modalNextBtn) {
    modalNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextProject();
    });
  }

  // клавіатура: Esc / ← / →
  window.addEventListener("keydown", (e) => {
    if (!modal || !modal.classList.contains("modal--open")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeProjectModal();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPrevProject();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      showNextProject();
    }
  });

  // перший рендер
  renderProjects(PROJECTS);
});
