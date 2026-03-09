// Eluma GitHub School — App

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLevelTabs();
  initPlayground();
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

// --- Stubs für spätere Module ---

// loadIdeas() — Session 5
// loadMissions() — Session 6
// initGlossar() — Session 7
