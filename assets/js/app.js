document.addEventListener('DOMContentLoaded', () => {
  const data = portfolioData;

  setProfile(data.profile);
  renderExpertise(data.capabilities);
  renderResume(data.resume);
  renderPortfolio(data.works);
  renderServices(data.services);
  renderJournal(data.journal);
  initTypewriter();
  initMouseColorCircle();

  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.toggle('active', item === link));
    });
  });
});

function initMouseColorCircle() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const circle = document.createElement('div');
  circle.className = 'cursor-invert';
  circle.setAttribute('aria-hidden', 'true');
  document.body.appendChild(circle);

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const current = { x: target.x, y: target.y };

  window.addEventListener('mousemove', (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
    circle.style.opacity = '1';
  });

  function animate() {
    current.x += (target.x - current.x) * 0.22;
    current.y += (target.y - current.y) * 0.22;

    circle.style.left = `${current.x}px`;
    circle.style.top = `${current.y}px`;

    requestAnimationFrame(animate);
  }

  animate();
}

function initTypewriter() {
  const target = document.getElementById('heroTitle');
  if (!target) return;

  const text = target.dataset.text || target.textContent.trim();
  target.dataset.text = text;
  target.textContent = '';

  let index = 0;
  function tick() {
    target.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      setTimeout(tick, 70);
    } else {
      setTimeout(() => {
        index = 0;
        target.textContent = '';
        tick();
      }, 900);
    }
  }

  tick();
}

function setProfile(profile) {
  const title = document.getElementById('heroTitle');
  if (title) title.textContent = profile.tagline;

  const subtitle = document.getElementById('heroSubtitle');
  if (subtitle) subtitle.textContent = profile.summary;

  const years = document.getElementById('heroYears');
  if (years) years.textContent = profile.years;

  const projects = document.getElementById('heroProjects');
  if (projects) projects.textContent = profile.projects;

  const markets = document.getElementById('heroLocations');
  if (markets) markets.textContent = profile.markets;

  const aboutSummary = document.getElementById('aboutSummary');
  if (aboutSummary) aboutSummary.textContent = profile.summary;

  const locationDetail = document.getElementById('locationDetail');
  if (locationDetail) locationDetail.textContent = profile.location;

  const emailDetail = document.getElementById('emailDetail');
  if (emailDetail) emailDetail.textContent = profile.email;

  const focusDetail = document.getElementById('focusDetail');
  if (focusDetail) focusDetail.textContent = profile.focus;
}

function renderExpertise(capabilities) {
  const expert = document.getElementById('expertiseList');
  if (!expert) return;

  expert.innerHTML = capabilities
    .map((item, index) => `<div class="expertise-list__item">${item}</div>`)
    .join('');
}

function renderResume(items) {
  const timeline = document.getElementById('resumeTimeline');
  if (!timeline) return;

  timeline.innerHTML = items
    .map(item => `
      <article class="timeline-item">
        <span class="timeline-item__period">${item.period}</span>
        <div class="timeline-item__title">${item.title}</div>
        <div class="timeline-item__company">${item.company}</div>
        <p class="timeline-item__details">${item.details}</p>
      </article>
    `)
    .join('');
}

function renderPortfolio(items) {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  grid.innerHTML = items
    .map((item, index) => `
      <article class="portfolio-card">
        <div class="portfolio-card__image">
          <span class="portfolio-card__tag">${item.status}</span>
          <span class="image-shape"></span>
        </div>
        <div class="portfolio-card__content">
          <div class="portfolio-card__top">
            <span class="portfolio-card__category">${item.category}</span>
            <span class="portfolio-card__year">${item.year}</span>
          </div>
          <div class="portfolio-card__title">${item.title}</div>
          <div class="portfolio-card__description">${item.description}</div>
          <div class="portfolio-card__tags">
            ${item.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `)
    .join('');
}

function renderServices(items) {
  const serviceGrid = document.getElementById('serviceGrid');
  if (!serviceGrid) return;

  serviceGrid.innerHTML = items
    .map((item) => `
      <article class="service-card">
        <span class="service-card__num">${item.label}</span>
        <div class="service-card__title">${item.title}</div>
        <div class="service-card__description">${item.description}</div>
        <div class="service-card__details">
          ${item.details.map(detail => `<span>${detail}</span>`).join('')}
        </div>
      </article>
    `)
    .join('');
}

function renderJournal(items) {
  const journalGrid = document.getElementById('journalGrid');
  if (!journalGrid) return;

  journalGrid.innerHTML = items
    .map(item => `
      <article class="journal-card">
        <span class="journal-card__meta">${item.meta}</span>
        <div class="journal-card__title">${item.title}</div>
        <div class="journal-card__description">${item.description}</div>
      </article>
    `)
    .join('');
}
