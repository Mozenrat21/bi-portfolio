---
layout: default
title: Pavlo Kondes — BI & Data Analytics
---

<section class="hero">
  <div class="hero__text">
    <p class="hero__badge">Available for remote part-time & project work</p>
    <h1>Hi, I'm <span>Pavlo Kondes</span><br>Senior BI & Data Analyst</h1>
    <p class="hero__subtitle">
      I build end-to-end analytics solutions with SQL Server, Power BI and SSRS.
    </p>
    <div class="hero__buttons">
      <a href="#" class="btn btn--primary" target="_blank">📄 Download CV</a>
      <a href="#contact" class="btn btn--ghost">✉️ Let’s talk</a>
    </div>
  </div>

  <div class="hero__sidecard">
    <!-- тут або аватар, або “PK” як раніше -->
  </div>
</section>

<section id="featured-projects" class="section">
  <h2>Featured projects</h2>
  <div class="projects-grid">
    {% assign featured = site.projects | where: 'featured', true | slice: 3 %}
    {% for project in featured %}
      <article class="project-card">
        <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
        <p class="project-card__meta">{{ project.meta }}</p>
        <p class="project-card__descr">{{ project.excerpt | strip_html }}</p>
      </article>
    {% endfor %}
  </div>
  <p class="section__link">
    <a href="{{ '/projects/' | relative_url }}">View all projects →</a>
  </p>
</section>

<!-- блоки Skills / About / Contact такі ж, як у попередньому макеті -->
