// Eluma GitHub School — App

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLevelTabs();
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

// --- Stubs für spätere Module ---

// loadIdeas() — Session 5
// loadMissions() — Session 6
// initPlayground() — Session 4
// initGlossar() — Session 7
