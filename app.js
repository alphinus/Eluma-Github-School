// Eluma GitHub School — App

let ideasData = [];
let categoriesData = [];

document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initLevelTabs();
  initPlayground();
  await loadCategories();
  await loadIdeas();
  initIdeaFilters();
  updateNextMission();
});

// --- Navigation ---

function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      showSection(sectionId);
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
  }
}

// --- Level Tabs (Missionen) ---

function initLevelTabs() {
  const tabs = document.querySelectorAll('.level-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Filtering wird in Session 6 implementiert
    });
  });
}

// --- Welcome: Nächste Mission ---

function updateNextMission() {
  const el = document.getElementById('next-mission');
  if (el) {
    el.textContent = 'Level 1, Mission 1: Button-Farbe ändern';
  }
}

// --- Playground ---

const THEMES = {
  default: { name: 'Standard', primary: '#2d6df6', secondary: '#1a1a2e', accent: '#f59e0b', bg: '#f5f7fa' },
  ocean: { name: 'Ozean', primary: '#0891b2', secondary: '#164e63', accent: '#06b6d4', bg: '#ecfeff' },
  forest: { name: 'Wald', primary: '#16a34a', secondary: '#14532d', accent: '#84cc16', bg: '#f0fdf4' },
  sunset: { name: 'Sonnenuntergang', primary: '#e11d48', secondary: '#4c0519', accent: '#f97316', bg: '#fff1f2' },
  night: { name: 'Nacht', primary: '#8b5cf6', secondary: '#0f0f23', accent: '#a78bfa', bg: '#1e1b2e' }
};

function initPlayground() {
  initThemeSwitcher();
  initMagicButton();
  initStatusBadge();
  initTestCard();
}

function initThemeSwitcher() {
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.dataset.theme;
      const theme = THEMES[themeId];
      if (!theme) return;

      document.documentElement.style.setProperty('--color-primary', theme.primary);
      document.documentElement.style.setProperty('--color-secondary', theme.secondary);
      document.documentElement.style.setProperty('--color-accent', theme.accent);
      document.documentElement.style.setProperty('--color-bg', theme.bg);
      document.documentElement.style.setProperty('--color-primary-light', theme.bg);

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const nameEl = document.getElementById('active-theme-name');
      if (nameEl) nameEl.textContent = theme.name;
    });
  });
}

function initMagicButton() {
  const applyBtn = document.getElementById('apply-btn-changes');
  if (!applyBtn) return;

  applyBtn.addEventListener('click', () => {
    const textInput = document.getElementById('btn-text-input');
    const colorInput = document.getElementById('btn-color-input');
    const magicBtn = document.getElementById('magic-button');

    if (textInput.value.trim()) {
      magicBtn.textContent = textInput.value.trim();
    }
    magicBtn.style.background = colorInput.value;
  });
}

function initStatusBadge() {
  const applyBtn = document.getElementById('apply-status');
  if (!applyBtn) return;

  const statusColors = {
    success: { bg: '#f0fdf4', color: '#10b981' },
    warning: { bg: '#fffbeb', color: '#f59e0b' },
    danger: { bg: '#fef2f2', color: '#ef4444' },
    info: { bg: '#e8f0fe', color: '#2d6df6' }
  };

  applyBtn.addEventListener('click', () => {
    const textInput = document.getElementById('status-input');
    const colorSelect = document.getElementById('status-color-select');
    const badge = document.getElementById('status-badge');

    if (textInput.value.trim()) {
      badge.textContent = textInput.value.trim();
    }

    const scheme = statusColors[colorSelect.value];
    if (scheme) {
      badge.style.background = scheme.bg;
      badge.style.color = scheme.color;
    }
  });
}

function initTestCard() {
  const toggleBtn = document.getElementById('toggle-test-card');
  const testCard = document.getElementById('test-card');
  if (!toggleBtn || !testCard) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = testCard.classList.toggle('hidden');
    toggleBtn.textContent = isHidden ? 'Karte anzeigen' : 'Karte verstecken';
  });
}

// --- Ideenboard ---

async function loadCategories() {
  try {
    const res = await fetch('data/config/categories.json');
    const data = await res.json();
    categoriesData = data.categories;

    const select = document.getElementById('filter-category');
    if (select) {
      categoriesData.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.name;
        opt.textContent = cat.name;
        select.appendChild(opt);
      });
    }
  } catch (e) {
    console.log('Kategorien konnten nicht geladen werden:', e);
  }
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = (values[i] || '').trim());
    return obj;
  });
}

async function loadIdeas() {
  try {
    const res = await fetch('data/ideas/ideas_merged.csv');
    const text = await res.text();
    ideasData = parseCSV(text);
    renderIdeas(ideasData);
  } catch (e) {
    console.log('Ideen konnten nicht geladen werden:', e);
  }
}

function renderIdeas(ideas) {
  const grid = document.getElementById('ideas-grid');
  if (!grid) return;

  if (ideas.length === 0) {
    grid.innerHTML = '<div class="card placeholder-card"><h3>Keine Ideen gefunden</h3><p>Ändere die Filter oder füge neue Ideen hinzu.</p></div>';
    return;
  }

  const categoryColor = (name) => {
    const cat = categoriesData.find(c => c.name.toLowerCase() === name.toLowerCase());
    return cat ? cat.color : '#6b7280';
  };

  const statusLabels = {
    raw: 'Roh',
    discussing: 'In Diskussion',
    validated: 'Validiert',
    parked: 'Geparkt',
    building: 'Im Bau'
  };

  grid.innerHTML = ideas.map(idea => `
    <div class="card idea-card">
      <div class="idea-header">
        <span class="badge badge-owner">${idea.owner}</span>
        <span class="badge" style="background: ${categoryColor(idea.category)}20; color: ${categoryColor(idea.category)}">${idea.category}</span>
      </div>
      <h3>${idea.title}</h3>
      <p>${idea.summary}</p>
      ${idea.problem ? `<p class="idea-problem"><strong>Problem:</strong> ${idea.problem}</p>` : ''}
      <div class="idea-footer">
        <span class="badge badge-status">${statusLabels[idea.status] || idea.status}</span>
        ${idea.next_step ? `<span class="idea-next">Nächster Schritt: ${idea.next_step}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function initIdeaFilters() {
  const ownerFilter = document.getElementById('filter-owner');
  const categoryFilter = document.getElementById('filter-category');
  const statusFilter = document.getElementById('filter-status');

  const applyFilters = () => {
    const owner = ownerFilter?.value || 'all';
    const category = categoryFilter?.value || 'all';
    const status = statusFilter?.value || 'all';

    const filtered = ideasData.filter(idea => {
      if (owner !== 'all' && idea.owner !== owner) return false;
      if (category !== 'all' && idea.category !== category) return false;
      if (status !== 'all' && idea.status !== status) return false;
      return true;
    });

    renderIdeas(filtered);
  };

  ownerFilter?.addEventListener('change', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
}

// --- Stubs für spätere Module ---

// loadMissions() — Session 6
// initGlossar() — Session 7
