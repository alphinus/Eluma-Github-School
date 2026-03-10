let ideasData = [];
let categoriesData = [];
let missionsData = [];
let activeMissionLevel = 'all';
let activeMissionView = 'unlocked';
let toastTimer = null;
let githubPlayerConfig = null;
let githubLeaderboard = [];
let githubSyncMeta = null;

const PROFILE_STORAGE_KEY = 'eluma-github-school-player-profiles';
const ACTIVE_PLAYER_KEY = 'eluma-github-school-active-player';
const PLAYER_PROFILES = {
  mario: { name: 'Mario', title: 'Mentor Mode', summary: 'Struktur, Reviews und Systempflege.', accent: 'Gold' },
  elvis: { name: 'Elvis', title: 'Builder Mode', summary: 'Lernen durch echte sichtbare Quests.', accent: 'Blue' }
};
const LEVEL_META = {
  1: { name: 'Commit Canyon', label: 'Warm-up', focus: 'Erste sichere GitHub-Schritte', bossLabel: 'README Gatekeeper' },
  2: { name: 'Sync Harbor', label: 'Sync', focus: 'Lokal vs. Remote verstehen', bossLabel: 'Remote Watcher' },
  3: { name: 'Branch Wilds', label: 'Branches', focus: 'Saubere Arbeitszweige nutzen', bossLabel: 'Naming Warden' },
  4: { name: 'Conflict Forge', label: 'Conflicts', focus: 'Konflikte bewusst lösen', bossLabel: 'Merge Hydra' },
  5: { name: 'Review Citadel', label: 'Review', focus: 'PRs fachlich beurteilen', bossLabel: 'Approval Council' }
};
const RANKS = [
  { name: 'Recruit', title: 'Neuling im Repo', minXp: 0 },
  { name: 'Operator', title: 'Kann kleine Quests sicher abarbeiten', minXp: 120 },
  { name: 'Navigator', title: 'Behält Branches und Ziele im Blick', minXp: 260 },
  { name: 'Strategist', title: 'Plant Schritte bewusst voraus', minXp: 460 },
  { name: 'Guardian', title: 'Beschützt Main vor Chaos', minXp: 720 },
  { name: 'Legend', title: 'Beherrscht den kompletten GitHub-Zyklus', minXp: 1040 }
];
const BADGES = [
  { threshold: 1, name: 'Scout' },
  { threshold: 3, name: 'Branch Explorer' },
  { threshold: 6, name: 'PR Pilot' },
  { threshold: 10, name: 'Merge Navigator' },
  { threshold: 14, name: 'Academy Champion' }
];
const THEME_UNLOCKS = { default: 0, ocean: 1, forest: 3, sunset: 6, night: 9 };
const THEMES = {
  default: { name: 'Standard', primary: '#2d6df6', secondary: '#0f1f38', accent: '#f59e0b', bg: '#edf4fb' },
  ocean: { name: 'Ozean', primary: '#0891b2', secondary: '#164e63', accent: '#06b6d4', bg: '#ecfeff' },
  forest: { name: 'Wald', primary: '#16a34a', secondary: '#14532d', accent: '#84cc16', bg: '#f0fdf4' },
  sunset: { name: 'Sonnenuntergang', primary: '#e11d48', secondary: '#4c0519', accent: '#f97316', bg: '#fff1f2' },
  night: { name: 'Nacht', primary: '#8b5cf6', secondary: '#0f0f23', accent: '#a78bfa', bg: '#e9e5ff' }
};
const PRACTICE_TASKS = [
  { id: 'theme', title: 'Palette Shift', description: 'Wechsle das Theme und beobachte die globale Wirkung.', xp: 12 },
  { id: 'magic', title: 'Button Forge', description: 'Ändere Text oder Farbe eines Buttons sichtbar.', xp: 18 },
  { id: 'status', title: 'Status Alchemy', description: 'Verändere Badge-Text und Signalwirkung.', xp: 18 },
  { id: 'toggle', title: 'Reveal Ritual', description: 'Blende ein verstecktes Element ein oder aus.', xp: 14 }
];
const PRACTICE_BONUS_XP = 26;
const ACHIEVEMENTS = [
  { id: 'first-quest', name: 'First Commit Spark', description: 'Schliesse deine erste echte Quest ab.', isEarned: s => s.completedMissions.length >= 1 },
  { id: 'lab-runner', name: 'Lab Runner', description: 'Erledige alle vier Training-Drills im Playground.', isEarned: s => PRACTICE_TASKS.every(task => s.completedPractices.includes(task.id)) },
  { id: 'boss-breaker', name: 'Boss Breaker', description: 'Besiege deinen ersten Boss einer Akademie.', isEarned: () => getCompletedBosses().length >= 1 },
  { id: 'level-one-clear', name: 'Warm-up Clear', description: 'Schliesse die komplette erste Akademie ab.', isEarned: () => isLevelComplete(1) },
  { id: 'hard-mode', name: 'Hard Mode', description: 'Schliesse mindestens eine schwere Quest ab.', isEarned: () => missionsData.some(m => m.difficulty === 'schwer' && isMissionCompleted(m.mission_id)) },
  { id: 'review-mindset', name: 'Review Mindset', description: 'Erledige mindestens zwei Review-bezogene Quests.', isEarned: () => missionsData.filter(m => /Review|PR/.test(m.github_skill) && isMissionCompleted(m.mission_id)).length >= 2 },
  { id: 'streak-three', name: 'Daily Rhythm', description: 'Halte eine Lernserie von drei Tagen.', isEarned: s => s.streak >= 3 },
  { id: 'halfway-there', name: 'Halfway There', description: 'Erreiche mindestens 50 Prozent Quest-Fortschritt.', isEarned: () => getProgressPercent() >= 50 }
];

let activePlayerId = loadActivePlayerId();
let playerProfiles = loadPlayerProfiles();
let playerState = playerProfiles[activePlayerId];

document.addEventListener('DOMContentLoaded', async () => {
  hydrateDailyActivity();
  initProfileSwitcher();
  initNavigation();
  initQuickActions();
  initLevelTabs();
  initViewTabs();
  initPlayground();
  initMissionActions();
  initAcademyActions();
  await Promise.all([loadCategories(), loadIdeas(), loadMissions(), loadGithubData()]);
  initIdeaFilters();
  initGlossarLinks();
  refreshDashboard();
});

function createDefaultPlayerState() {
  return { completedMissions: [], completedPractices: [], lastActiveDate: '', streak: 0, eventLog: [] };
}

function normalizePlayerState(parsed) {
  return {
    completedMissions: Array.isArray(parsed?.completedMissions) ? parsed.completedMissions : [],
    completedPractices: Array.isArray(parsed?.completedPractices) ? parsed.completedPractices : [],
    lastActiveDate: typeof parsed?.lastActiveDate === 'string' ? parsed.lastActiveDate : '',
    streak: Number.isFinite(parsed?.streak) ? parsed.streak : 0,
    eventLog: Array.isArray(parsed?.eventLog) ? parsed.eventLog : []
  };
}

function loadActivePlayerId() {
  try {
    const stored = localStorage.getItem(ACTIVE_PLAYER_KEY);
    return stored && PLAYER_PROFILES[stored] ? stored : 'mario';
  } catch {
    return 'mario';
  }
}

function loadPlayerProfiles() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      mario: normalizePlayerState(parsed?.mario || createDefaultPlayerState()),
      elvis: normalizePlayerState(parsed?.elvis || createDefaultPlayerState())
    };
  } catch {
    return {
      mario: createDefaultPlayerState(),
      elvis: createDefaultPlayerState()
    };
  }
}

function savePlayerState() {
  try {
    playerProfiles[activePlayerId] = playerState;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(playerProfiles));
    localStorage.setItem(ACTIVE_PLAYER_KEY, activePlayerId);
  } catch {}
}

function initProfileSwitcher() {
  document.querySelectorAll('.profile-chip').forEach(button => {
    button.addEventListener('click', () => {
      const nextPlayer = button.dataset.player;
      if (!nextPlayer || nextPlayer === activePlayerId || !PLAYER_PROFILES[nextPlayer]) return;
      activePlayerId = nextPlayer;
      playerState = playerProfiles[activePlayerId];
      hydrateDailyActivity();
      savePlayerState();
      refreshDashboard();
      showToast(`Aktives Profil: ${PLAYER_PROFILES[activePlayerId].name}`);
    });
  });
}

function hydrateDailyActivity() {
  const today = new Date().toISOString().slice(0, 10);
  if (playerState.lastActiveDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  playerState.streak = playerState.lastActiveDate === yesterday.toISOString().slice(0, 10) ? Math.max(1, playerState.streak + 1) : 1;
  playerState.lastActiveDate = today;
  logEvent(`Streak aktiv: ${playerState.streak} Tag${playerState.streak === 1 ? '' : 'e'} in Folge.`);
  savePlayerState();
}

function logEvent(text) {
  playerState.eventLog = [text, ...playerState.eventLog.filter(entry => entry !== text)].slice(0, 6);
}

function getCompletedCountForState(state) { return new Set(state?.completedMissions || []).size; }
function getCompletedPracticeCountForState(state) { return new Set(state?.completedPractices || []).size; }
function getCompletedBossesForState(state) {
  const completed = new Set(state?.completedMissions || []);
  return Object.keys(LEVEL_META).map(key => getBossMission(Number(key))).filter(Boolean).filter(mission => completed.has(mission.mission_id));
}
function getPracticeXpForState(state) {
  const done = new Set(state?.completedPractices || []);
  const base = PRACTICE_TASKS.reduce((sum, task) => sum + (done.has(task.id) ? task.xp : 0), 0);
  return base + (done.size === PRACTICE_TASKS.length ? PRACTICE_BONUS_XP : 0);
}
function getEarnedXpForState(state) {
  const done = new Set(state?.completedMissions || []);
  return missionsData.reduce((sum, mission) => sum + (done.has(mission.mission_id) ? getMissionPoints(mission) : 0), 0) + getPracticeXpForState(state);
}
function getRankForState(state) {
  let current = RANKS[0];
  const xp = getEarnedXpForState(state);
  RANKS.forEach(rank => { if (xp >= rank.minXp) current = rank; });
  return current;
}
function getGithubConfigForPlayer(playerId) { return githubPlayerConfig?.players?.[playerId] || null; }
function getGithubEntryForPlayer(playerId) { return Array.isArray(githubLeaderboard) ? githubLeaderboard.find(entry => entry.id === playerId) || null : null; }
function getRepoScopeLabel() {
  const activeScope = githubPlayerConfig?.scope?.active;
  if (activeScope === 'all-repos') return 'alle GitHub-Repos';
  if (activeScope === 'eluma-only') return githubPlayerConfig?.scope?.primary_repo || 'Eluma-Github-School';
  return 'konfigurierbar';
}
function getGithubStatusLabel(entry) {
  const labels = {
    placeholder: 'Platzhalter',
    'username-pending': 'Username fehlt',
    synced: 'Live',
    paused: 'Pausiert',
    'token-missing': 'Token fehlt',
    error: 'Sync Fehler',
    offline: 'Offline'
  };
  return labels[entry?.status] || 'Bereit';
}
function getGithubMetrics(entry) {
  if (!entry) return 'GitHub noch ohne Live-Daten';
  return `PR ${Number(entry.pull_requests || 0)} · Reviews ${Number(entry.reviews || 0)} · Commits ${Number(entry.commits || 0)}`;
}
function getGithubSyncLabel() {
  if (!githubSyncMeta?.updatedAt) return 'noch kein GitHub-Sync';
  const stamp = new Date(githubSyncMeta.updatedAt);
  if (Number.isNaN(stamp.getTime())) return 'GitHub-Sync aktiv';
  return `Sync ${stamp.toLocaleDateString('de-CH')} ${stamp.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}`;
}
function getLeaderboardEntries() {
  return Object.entries(PLAYER_PROFILES).map(([id, profile]) => {
    const state = playerProfiles[id] || createDefaultPlayerState();
    const localXp = getEarnedXpForState(state);
    const quests = getCompletedCountForState(state);
    const bosses = getCompletedBossesForState(state).length;
    const practices = getCompletedPracticeCountForState(state);
    const localScore = localXp + (quests * 12) + (bosses * 35) + (practices * 8) + (state.streak * 10);
    const githubConfig = getGithubConfigForPlayer(id);
    const githubEntry = getGithubEntryForPlayer(id);
    const githubUsername = githubConfig?.github_username || githubEntry?.github_username || `${id}-github`;
    const githubScore = Number(githubEntry?.github_score || 0);
    return {
      id,
      name: profile.name,
      rank: getRankForState(state).name,
      quests,
      bosses,
      xp: localXp,
      streak: state.streak,
      localScore,
      githubScore,
      score: localScore + githubScore,
      githubUsername,
      githubStatus: getGithubStatusLabel(githubEntry || { status: githubConfig?.status }),
      githubMetrics: getGithubMetrics(githubEntry),
      scopeLabel: getRepoScopeLabel()
    };
  }).sort((a, b) => b.score - a.score || b.githubScore - a.githubScore || b.localScore - a.localScore);
}

function getCompletedSet() { return new Set(playerState.completedMissions); }
function isMissionCompleted(missionId) { return getCompletedSet().has(missionId); }
function getCompletedCount() { return getCompletedSet().size; }
function getCompletedPracticeCount() { return new Set(playerState.completedPractices).size; }
function getBossMission(level) { const items = missionsData.filter(m => m.level === level); return items[items.length - 1] || null; }
function isBossMission(mission) { const boss = getBossMission(mission.level); return boss ? boss.mission_id === mission.mission_id : false; }
function getCompletedBosses() { return Object.keys(LEVEL_META).map(key => getBossMission(Number(key))).filter(Boolean).filter(m => isMissionCompleted(m.mission_id)); }
function isLevelUnlocked(level) { if (level <= 1) return true; const boss = getBossMission(level - 1); return boss ? isMissionCompleted(boss.mission_id) : false; }
function isLevelComplete(level) { const items = missionsData.filter(m => m.level === level); return items.length > 0 && items.every(m => isMissionCompleted(m.mission_id)); }
function getUnlockedAcademyCount() { return Object.keys(LEVEL_META).filter(key => isLevelUnlocked(Number(key))).length; }
function isMissionUnlocked(mission) { return isMissionCompleted(mission.mission_id) || (isLevelUnlocked(mission.level) && (mission.prerequisites || []).every(id => isMissionCompleted(id))); }
function getLockedReason(mission) {
  if (isMissionCompleted(mission.mission_id)) return '';
  if (!isLevelUnlocked(mission.level)) return `Level gesperrt. Besiege erst den Boss von ${LEVEL_META[mission.level - 1]?.name || `Level ${mission.level - 1}`}.`;
  const missing = (mission.prerequisites || []).filter(id => !isMissionCompleted(id));
  return missing.length > 0 ? `Benötigt zuerst: ${missing.join(', ')}` : 'Noch nicht freigeschaltet.';
}
function getMissionPoints(mission) { const points = { einfach: 40, mittel: 80, schwer: 140 }; return (points[mission.difficulty] || 50) + (isBossMission(mission) ? 30 : 0); }
function getPracticeXp() { return getPracticeXpForState(playerState); }
function getEarnedXp() { return getEarnedXpForState(playerState); }
function getUnlockedBadges() { return BADGES.filter(badge => getCompletedCount() >= badge.threshold); }
function getNextBadge() { return BADGES.find(badge => getCompletedCount() < badge.threshold) || null; }
function getCurrentRank() { let current = RANKS[0]; RANKS.forEach(rank => { if (getEarnedXp() >= rank.minXp) current = rank; }); return current; }
function getNextRank() { return RANKS.find(rank => rank.minXp > getEarnedXp()) || null; }
function getRankProgress() {
  const current = getCurrentRank();
  const next = getNextRank();
  const xp = getEarnedXp();
  if (!next) return { current, next: null, progress: 100, label: `${xp} XP / MAX` };
  return { current, next, progress: Math.max(0, Math.min(100, Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100))), label: `${xp} / ${next.minXp} XP` };
}
function getProgressPercent() { return missionsData.length === 0 ? 0 : Math.round((getCompletedCount() / missionsData.length) * 100); }
function getPlayerClass() {
  const completed = missionsData.filter(m => isMissionCompleted(m.mission_id));
  const review = completed.filter(m => /Review|PR/.test(m.github_skill)).length;
  const conflict = completed.filter(m => /Konflikt|Conflict/.test(m.title) || /Konflikte/.test(m.github_skill)).length;
  const idea = completed.filter(m => /Idee|CSV|Dokumentation/.test(m.title) || /CSV|Dokumentation/.test(m.github_skill)).length;
  if (review >= 3) return 'Reviewer';
  if (conflict >= 2) return 'Resolver';
  if (idea >= 3) return 'Archivist';
  if (getCompletedBosses().length >= 2) return 'Guardian';
  return 'Builder';
}
function getNextMission() { return missionsData.find(m => isMissionUnlocked(m) && !isMissionCompleted(m.mission_id)) || null; }
function getCurrentLevelSummary() { const mission = getNextMission(); const level = mission ? mission.level : 5; return { level, meta: LEVEL_META[level] || LEVEL_META[1] }; }
function getCurrentBossTarget() { return Object.keys(LEVEL_META).map(key => getBossMission(Number(key))).filter(Boolean).find(m => isMissionUnlocked(m) && !isMissionCompleted(m.mission_id)) || Object.keys(LEVEL_META).map(key => getBossMission(Number(key))).filter(Boolean).find(m => !isMissionCompleted(m.mission_id)) || null; }
function getEarnedAchievements() { return ACHIEVEMENTS.filter(achievement => achievement.isEarned(playerState)); }
function getSnapshot() { return { rank: getCurrentRank().name, badgeCount: getUnlockedBadges().length, bosses: getCompletedBosses().length, academies: getUnlockedAcademyCount(), achievements: getEarnedAchievements().length }; }
function refreshDashboard() {
  renderMissionView();
  renderCampaignStrip();
  renderAcademyMap();
  renderAchievementGrid();
  renderPracticeGrid();
  updatePracticeSummary();
  updateIdeasGuide(ideasData.length);
  updateHud();
  updateNextMission();
  updateBossPanel();
  updateMissionOverview();
  updateProfileIdentity();
  renderLeaderboard();
  renderEventFeed();
  updateThemeUnlocks();
}

function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      showSection(button.dataset.section);
      activateNav(button.dataset.section);
    });
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function activateNav(sectionId) {
  document.querySelectorAll('.nav-btn').forEach(button => button.classList.toggle('active', button.dataset.section === sectionId));
}

function initQuickActions() {
  document.getElementById('start-next-mission')?.addEventListener('click', () => {
    const mission = getNextMission();
    if (mission) jumpToMission(mission.mission_id);
    else showToast('Alle freigeschalteten Quests sind erledigt.');
  });
  document.getElementById('jump-to-playground')?.addEventListener('click', () => {
    showSection('playground');
    activateNav('playground');
  });
  document.getElementById('jump-to-boss')?.addEventListener('click', () => {
    const boss = getCurrentBossTarget();
    if (boss) jumpToMission(boss.mission_id);
  });
}

function initLevelTabs() {
  document.querySelectorAll('.level-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeMissionLevel = tab.dataset.level;
      document.querySelectorAll('.level-tab').forEach(button => button.classList.toggle('active', button.dataset.level === activeMissionLevel));
      renderMissionView();
      renderCampaignStrip();
    });
  });
}

function initViewTabs() {
  document.querySelectorAll('.view-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeMissionView = tab.dataset.view;
      document.querySelectorAll('.view-tab').forEach(button => button.classList.toggle('active', button.dataset.view === activeMissionView));
      renderMissionView();
    });
  });
}

function initAcademyActions() {
  document.getElementById('academy-map')?.addEventListener('click', event => {
    const button = event.target.closest('[data-academy-jump]');
    if (button) focusLevel(button.dataset.academyJump);
  });
  document.getElementById('campaign-strip')?.addEventListener('click', event => {
    const button = event.target.closest('[data-campaign-jump]');
    if (button) focusLevel(button.dataset.campaignJump);
  });
}

function focusLevel(levelValue) {
  activeMissionLevel = String(levelValue);
  activeMissionView = 'unlocked';
  document.querySelectorAll('.level-tab').forEach(button => button.classList.toggle('active', button.dataset.level === activeMissionLevel));
  document.querySelectorAll('.view-tab').forEach(button => button.classList.toggle('active', button.dataset.view === activeMissionView));
  renderMissionView();
  renderCampaignStrip();
  showSection('missionen');
  activateNav('missionen');
}

function initPlayground() {
  initThemeSwitcher();
  initMagicButton();
  initStatusBadge();
  initTestCard();
}

function initThemeSwitcher() {
  document.querySelectorAll('.theme-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (button.disabled) {
        showToast(button.title || 'Dieses Theme ist noch gesperrt.');
        return;
      }
      const theme = THEMES[button.dataset.theme];
      if (!theme) return;
      applyTheme(theme);
      document.querySelectorAll('.theme-btn').forEach(entry => entry.classList.toggle('active', entry === button));
      setText('active-theme-name', theme.name);
      markPracticeComplete('theme', `Training abgeschlossen: ${PRACTICE_TASKS.find(task => task.id === 'theme')?.title}.`);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.style.setProperty('--color-primary', theme.primary);
  document.documentElement.style.setProperty('--color-secondary', theme.secondary);
  document.documentElement.style.setProperty('--color-accent', theme.accent);
  document.documentElement.style.setProperty('--color-bg', theme.bg);
  document.documentElement.style.setProperty('--color-primary-light', theme.bg);
}

function updateThemeUnlocks() {
  const completedCount = getCompletedCount();
  document.querySelectorAll('.theme-btn').forEach(button => {
    const required = THEME_UNLOCKS[button.dataset.theme] ?? 0;
    const unlocked = completedCount >= required;
    button.disabled = !unlocked;
    button.classList.toggle('is-locked', !unlocked);
    button.title = unlocked ? THEMES[button.dataset.theme]?.name || 'Theme' : `Gesperrt bis ${required} erledigte Quests`;
  });
}

function initMagicButton() {
  document.getElementById('apply-btn-changes')?.addEventListener('click', () => {
    const textInput = document.getElementById('btn-text-input');
    const colorInput = document.getElementById('btn-color-input');
    const magicButton = document.getElementById('magic-button');
    if (!textInput || !colorInput || !magicButton) return;
    if (textInput.value.trim()) magicButton.textContent = textInput.value.trim();
    magicButton.style.background = colorInput.value;
    markPracticeComplete('magic', 'Training abgeschlossen: Button Forge.');
  });
}

function initStatusBadge() {
  const statusColors = {
    success: { bg: '#ecfdf3', color: '#059669' },
    warning: { bg: '#fffbeb', color: '#d97706' },
    danger: { bg: '#fef2f2', color: '#dc2626' },
    info: { bg: '#eff6ff', color: '#2563eb' }
  };
  document.getElementById('apply-status')?.addEventListener('click', () => {
    const textInput = document.getElementById('status-input');
    const colorSelect = document.getElementById('status-color-select');
    const badge = document.getElementById('status-badge');
    if (!textInput || !colorSelect || !badge) return;
    if (textInput.value.trim()) badge.textContent = textInput.value.trim();
    const scheme = statusColors[colorSelect.value];
    if (scheme) {
      badge.style.background = scheme.bg;
      badge.style.color = scheme.color;
    }
    markPracticeComplete('status', 'Training abgeschlossen: Status Alchemy.');
  });
}

function initTestCard() {
  const toggleButton = document.getElementById('toggle-test-card');
  const testCard = document.getElementById('test-card');
  if (!toggleButton || !testCard) return;
  toggleButton.addEventListener('click', () => {
    const isHidden = testCard.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? 'Karte anzeigen' : 'Karte verstecken';
    markPracticeComplete('toggle', 'Training abgeschlossen: Reveal Ritual.');
  });
}

function markPracticeComplete(practiceId, message) {
  if (playerState.completedPractices.includes(practiceId)) return;
  const before = getSnapshot();
  playerState.completedPractices = [...playerState.completedPractices, practiceId];
  logEvent(`${PRACTICE_TASKS.find(task => task.id === practiceId)?.title || practiceId} im Training Lab gemeistert.`);
  savePlayerState();
  refreshDashboard();
  celebrateProgressChange(before, getSnapshot(), message);
}

async function loadCategories() {
  try {
    const response = await fetch('data/config/categories.json');
    const data = await response.json();
    categoriesData = Array.isArray(data.categories) ? data.categories : [];
    const select = document.getElementById('filter-category');
    if (select) {
      categoriesData.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.log('Kategorien konnten nicht geladen werden:', error);
  }
}

function parseCSV(text) {
  const rows = [];
  let current = '';
  let row = [];
  let inQuotes = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
      continue;
    }
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') index += 1;
      if (current.length > 0 || row.length > 0) {
        row.push(current);
        rows.push(row);
        row = [];
        current = '';
      }
      continue;
    }
    current += char;
  }
  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }
  if (rows.length < 2) return [];
  const headers = rows[0].map(value => value.trim());
  return rows.slice(1).filter(values => values.some(value => value.trim() !== '')).map(values => {
    const entry = {};
    headers.forEach((header, index) => { entry[header] = (values[index] || '').trim(); });
    return entry;
  });
}

async function loadIdeas() {
  try {
    const response = await fetch('data/ideas/ideas_merged.csv');
    ideasData = parseCSV(await response.text());
    renderIdeas(ideasData);
  } catch (error) {
    console.log('Ideen konnten nicht geladen werden:', error);
  }
}

function categoryColor(name) {
  const category = categoriesData.find(entry => entry.name.toLowerCase() === String(name).toLowerCase());
  return category ? category.color : '#64748b';
}

function renderIdeas(ideas) {
  const grid = document.getElementById('ideas-grid');
  if (!grid) return;
  if (ideas.length === 0) {
    grid.innerHTML = '<div class="card placeholder-card"><h3>Keine Ideen gefunden</h3><p>Ändere die Filter oder füge neue Ideen hinzu.</p></div>';
    return;
  }
  const labels = { raw: 'Roh', discussing: 'In Diskussion', validated: 'Validiert', parked: 'Geparkt', building: 'Im Bau' };
  grid.innerHTML = ideas.map(idea => {
    const color = categoryColor(idea.category);
    return `<article class="card idea-card"><div class="idea-header"><span class="badge">${escapeHtml(idea.owner || 'Unbekannt')}</span><span class="badge" style="background: ${color}20; color: ${color}">${escapeHtml(idea.category || 'Ohne Kategorie')}</span></div><h3>${escapeHtml(idea.title || 'Ohne Titel')}</h3><p>${escapeHtml(idea.summary || 'Keine Kurzbeschreibung vorhanden.')}</p>${idea.problem ? `<p class="idea-problem"><strong>Problem:</strong> ${escapeHtml(idea.problem)}</p>` : ''}<div class="idea-footer"><span class="badge badge-status">${escapeHtml(labels[idea.status] || idea.status || 'Offen')}</span>${idea.next_step ? `<span class="idea-next">Nächster Schritt: ${escapeHtml(idea.next_step)}</span>` : ''}</div></article>`;
  }).join('');
}

function initIdeaFilters() {
  const ownerFilter = document.getElementById('filter-owner');
  const categoryFilter = document.getElementById('filter-category');
  const statusFilter = document.getElementById('filter-status');
  const applyFilters = () => {
    const owner = ownerFilter?.value || 'all';
    const category = categoryFilter?.value || 'all';
    const status = statusFilter?.value || 'all';
    const filtered = ideasData.filter(idea => (owner === 'all' || idea.owner === owner) && (category === 'all' || idea.category === category) && (status === 'all' || idea.status === status));
    renderIdeas(filtered);
    updateIdeasGuide(filtered.length);
  };
  ownerFilter?.addEventListener('change', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
}

function updateIdeasGuide(count) {
  setText('ideas-guide', `${count} Idee${count === 1 ? '' : 'n'} sichtbar. Nutze die Filter, um schneller die richtige Karte zu finden.`);
  setText('ideas-energy', `${count} Karte${count === 1 ? '' : 'n'} im Radar. Jede neue Idee kann später eine echte Quest werden.`);
}

async function loadMissions() {
  try {
    const response = await fetch('data/missions/missions.json');
    const data = await response.json();
    missionsData = Array.isArray(data.missions) ? data.missions : [];
  } catch (error) {
    console.log('Missionen konnten nicht geladen werden:', error);
  }
}

async function loadGithubData() {
  try {
    const [configResponse, leaderboardResponse] = await Promise.all([
      fetch('data/players/github-config.json'),
      fetch('data/players/github-leaderboard.json')
    ]);
    if (!configResponse.ok || !leaderboardResponse.ok) throw new Error('GitHub-Playerdaten fehlen.');
    const configData = await configResponse.json();
    const leaderboardData = await leaderboardResponse.json();
    githubPlayerConfig = {
      mode: configData?.mode || 'placeholder',
      scope: configData?.scope || { active: 'all-repos', primary_repo: 'Eluma-Github-School' },
      players: configData?.players || {},
      scoring: configData?.scoring || {}
    };
    githubLeaderboard = Array.isArray(leaderboardData?.players) ? leaderboardData.players : [];
    githubSyncMeta = {
      updatedAt: leaderboardData?.updated_at || '',
      source: leaderboardData?.source || configData?.mode || 'placeholder',
      tokenMode: leaderboardData?.token_mode || 'none'
    };
  } catch (error) {
    githubPlayerConfig = { mode: 'offline', scope: { active: 'all-repos', primary_repo: 'Eluma-Github-School' }, players: {}, scoring: {} };
    githubLeaderboard = [];
    githubSyncMeta = { updatedAt: '', source: 'offline', tokenMode: 'none' };
    console.log('GitHub-Playerdaten konnten nicht geladen werden:', error);
  }
}
function renderAcademyMap() {
  const container = document.getElementById('academy-map');
  if (!container) return;
  container.innerHTML = Object.entries(LEVEL_META).map(([levelKey, meta]) => {
    const level = Number(levelKey);
    const unlocked = isLevelUnlocked(level);
    const completed = isLevelComplete(level);
    const boss = getBossMission(level);
    const levelMissions = missionsData.filter(mission => mission.level === level);
    const done = levelMissions.filter(mission => isMissionCompleted(mission.mission_id)).length;
    const progress = levelMissions.length === 0 ? 0 : Math.round((done / levelMissions.length) * 100);
    const classes = ['academy-card', unlocked ? 'is-unlocked' : 'is-locked', completed ? 'is-complete' : ''].filter(Boolean).join(' ');
    return `<article class="${classes}" style="--academy-progress:${progress}%;"><div class="academy-aura"></div><div class="academy-head"><span class="mini-label dark">Level ${level}</span><span class="academy-sigil">${level}</span></div><h3>${escapeHtml(meta.name)}</h3><p>${escapeHtml(meta.focus)}</p><div class="academy-metrics"><div class="orb-meter"><span>${progress}%</span></div><div class="academy-stat-stack"><span class="badge">${done}/${levelMissions.length} Quests</span><span class="badge ${completed ? 'badge-status' : unlocked ? '' : 'badge-status is-locked'}">${completed ? 'Clear' : unlocked ? 'Offen' : 'Locked'}</span></div></div><p><strong>Boss:</strong> ${escapeHtml(boss?.title || meta.bossLabel)}</p><div class="academy-footer"><small>${completed ? 'Boss besiegt. Akademie abgeschlossen.' : unlocked ? 'Akademie spielbar.' : 'Warte auf Boss-Sieg im vorherigen Level.'}</small><button class="academy-action" data-academy-jump="${level}" ${unlocked ? '' : 'disabled'}>Öffnen</button></div></article>`;
  }).join('');
}

function renderCampaignStrip() {
  const container = document.getElementById('campaign-strip');
  if (!container) return;
  const levels = activeMissionLevel === 'all' ? Object.keys(LEVEL_META).map(levelKey => Number(levelKey)) : [Number(activeMissionLevel)];
  container.innerHTML = levels.map(level => {
    const meta = LEVEL_META[level];
    const unlocked = isLevelUnlocked(level);
    const boss = getBossMission(level);
    const levelMissions = missionsData.filter(mission => mission.level === level);
    const openCount = levelMissions.filter(mission => isMissionUnlocked(mission) && !isMissionCompleted(mission.mission_id)).length;
    const percent = levelMissions.length === 0 ? 0 : Math.round((levelMissions.filter(mission => isMissionCompleted(mission.mission_id)).length / levelMissions.length) * 100);
    const classes = ['campaign-card', unlocked ? '' : 'is-locked', isLevelComplete(level) ? 'is-complete' : ''].filter(Boolean).join(' ');
    return `<article class="${classes}" style="--campaign-progress:${percent}%;"><div class="campaign-shine"></div><span class="mini-label dark">Kampagne</span><h3>${escapeHtml(meta.label)}</h3><p>${escapeHtml(meta.focus)}</p><div class="campaign-meter"><span>${percent}%</span></div><div class="badge-row"><span class="badge">${levelMissions.length} Quests</span><span class="badge badge-xp">Boss: ${escapeHtml(boss?.title || meta.bossLabel)}</span></div><div class="campaign-footer"><small>${unlocked ? `${openCount} aktuell spielbar` : 'Noch gesperrt'}</small><button class="secondary-action compact-action" data-campaign-jump="${level}" ${unlocked ? '' : 'disabled'}>Zu Level ${level}</button></div></article>`;
  }).join('');
}

function getFilteredMissions() {
  let missions = activeMissionLevel === 'all' ? [...missionsData] : missionsData.filter(mission => mission.level === Number(activeMissionLevel));
  if (activeMissionView === 'unlocked') missions = missions.filter(mission => isMissionUnlocked(mission) || isMissionCompleted(mission.mission_id));
  else if (activeMissionView === 'locked') missions = missions.filter(mission => !isMissionUnlocked(mission) && !isMissionCompleted(mission.mission_id));
  else if (activeMissionView === 'boss') missions = missions.filter(mission => isBossMission(mission));
  return missions;
}

function renderMissionView() {
  renderMissions(getFilteredMissions());
}

function renderMissions(missions) {
  const grid = document.getElementById('missions-grid');
  if (!grid) return;
  if (missions.length === 0) {
    grid.innerHTML = '<div class="card placeholder-card"><h3>Keine Quests in dieser Ansicht</h3><p>Wechsle Filter oder schalte erst neue Akademien frei.</p></div>';
    return;
  }
  const difficultyColors = {
    einfach: { bg: '#ecfdf3', color: '#059669' },
    mittel: { bg: '#fffbeb', color: '#d97706' },
    schwer: { bg: '#fef2f2', color: '#dc2626' }
  };
  grid.innerHTML = missions.map(mission => {
    const completed = isMissionCompleted(mission.mission_id);
    const unlocked = isMissionUnlocked(mission);
    const boss = isBossMission(mission);
    const difficulty = difficultyColors[mission.difficulty] || { bg: '#eff6ff', color: '#1d4ed8' };
    const classes = ['mission-card', completed ? 'is-done' : '', boss ? 'is-boss' : '', !unlocked && !completed ? 'is-locked' : ''].filter(Boolean).join(' ');
    const prerequisites = (mission.prerequisites || []).length > 0 ? mission.prerequisites.join(', ') : 'Keine';
    const reward = getMissionPoints(mission);
    const lockedReason = !unlocked && !completed ? getLockedReason(mission) : '';
    return `<article class="${classes}" style="--mission-reward:${Math.min(100, reward)}%;"><div class="mission-flare"></div><div class="mission-topline"><span class="badge">Level ${mission.level}</span><span class="badge badge-xp">${reward} XP</span><span class="badge ${completed ? 'badge-status' : unlocked ? '' : 'badge-status is-locked'}">${completed ? 'Erledigt' : unlocked ? 'Spielbar' : 'Gesperrt'}</span>${boss ? '<span class="badge badge-boss">Boss</span>' : ''}</div><div class="mission-banner"><div><h3>${escapeHtml(mission.title)}</h3><p class="mission-story">${escapeHtml(mission.story)}</p></div><div class="mission-reward-orb"><span>${reward}</span></div></div><div class="mission-meta"><p><strong>Ziel:</strong> ${escapeHtml(mission.objective)}</p>${Array.isArray(mission.files_to_edit) && mission.files_to_edit.length > 0 ? `<p><strong>Dateien:</strong> ${mission.files_to_edit.map(file => escapeHtml(file)).join(', ')}</p>` : '<p><strong>Dateien:</strong> Keine direkte Repo-Datei nötig</p>'}${mission.branch_name_example ? `<p><strong>Branch:</strong> ${escapeHtml(mission.branch_name_example)}</p>` : ''}<p><strong>Skill:</strong> ${escapeHtml(mission.github_skill)}</p></div><div class="mission-prereqs"><div class="badge-row"><span class="badge" style="background: ${difficulty.bg}; color: ${difficulty.color};">${escapeHtml(mission.difficulty)}</span><span class="badge">${escapeHtml(prerequisites)}</span></div>${lockedReason ? `<p><strong>Lock:</strong> ${escapeHtml(lockedReason)}</p>` : '<p>Freigeschaltet oder bereits gemeistert.</p>'}</div><div class="mission-criteria"><strong>Erfolgskriterien</strong><ul>${(mission.acceptance_criteria || []).map(criteria => `<li>${escapeHtml(criteria)}</li>`).join('')}</ul></div><div class="mission-actions"><button class="mission-toggle ${completed ? 'is-done' : 'is-open'}" data-mission-toggle="${mission.mission_id}" ${!completed && !unlocked ? 'disabled' : ''}>${completed ? 'Als offen markieren' : 'Quest abschliessen'}</button><button class="mission-jump" data-mission-focus="${mission.mission_id}">Fokussieren</button></div></article>`;
  }).join('');
}

function initMissionActions() {
  document.getElementById('missions-grid')?.addEventListener('click', event => {
    const toggleButton = event.target.closest('[data-mission-toggle]');
    if (toggleButton) {
      toggleMission(toggleButton.dataset.missionToggle);
      return;
    }
    const focusButton = event.target.closest('[data-mission-focus]');
    if (focusButton) jumpToMission(focusButton.dataset.missionFocus);
  });
}

function toggleMission(missionId) {
  const mission = missionsData.find(entry => entry.mission_id === missionId);
  if (!mission) return;
  if (!isMissionUnlocked(mission) && !isMissionCompleted(missionId)) {
    showToast(getLockedReason(mission));
    return;
  }
  const before = getSnapshot();
  const done = isMissionCompleted(missionId);
  if (done) {
    playerState.completedMissions = playerState.completedMissions.filter(entry => entry !== missionId);
    logEvent(`Quest zurückgesetzt: ${mission.title}.`);
  } else {
    playerState.completedMissions = [...playerState.completedMissions, missionId];
    logEvent(`Quest erledigt: ${mission.title}.`);
  }
  savePlayerState();
  refreshDashboard();
  celebrateProgressChange(before, getSnapshot(), done ? `Quest wieder geöffnet: ${mission.title}.` : `Quest erledigt: ${mission.title}. +${getMissionPoints(mission)} XP`);
}

function jumpToMission(missionId) {
  const mission = missionsData.find(entry => entry.mission_id === missionId);
  if (!mission) return;
  activeMissionLevel = String(mission.level);
  activeMissionView = isMissionUnlocked(mission) ? 'unlocked' : 'all';
  document.querySelectorAll('.level-tab').forEach(button => button.classList.toggle('active', button.dataset.level === activeMissionLevel));
  document.querySelectorAll('.view-tab').forEach(button => button.classList.toggle('active', button.dataset.view === activeMissionView));
  renderMissionView();
  renderCampaignStrip();
  showSection('missionen');
  activateNav('missionen');
}

function celebrateProgressChange(before, after, primaryMessage) {
  const notes = [primaryMessage];
  if (after.rank !== before.rank) {
    notes.push(`Neuer Rang: ${after.rank}`);
    logEvent(`Rang aufgestiegen: ${after.rank}.`);
  }
  if (after.badgeCount > before.badgeCount) {
    const badge = getUnlockedBadges()[after.badgeCount - 1];
    if (badge) {
      notes.push(`Badge freigeschaltet: ${badge.name}`);
      logEvent(`Badge freigeschaltet: ${badge.name}.`);
    }
  }
  if (after.bosses > before.bosses) {
    notes.push('Boss besiegt');
    logEvent('Ein Akademie-Boss wurde besiegt.');
  }
  if (after.academies > before.academies) {
    notes.push('Neue Akademie freigeschaltet');
    logEvent('Eine neue Akademie wurde freigeschaltet.');
  }
  if (after.achievements > before.achievements) {
    const achievement = getEarnedAchievements()[after.achievements - 1];
    if (achievement) {
      notes.push(`Achievement: ${achievement.name}`);
      logEvent(`Achievement freigeschaltet: ${achievement.name}.`);
    }
  }
  savePlayerState();
  renderEventFeed();
  showToast(notes.join(' | '));
}
function updateProfileIdentity() {
  const activeProfile = PLAYER_PROFILES[activePlayerId];
  const leaderboard = getLeaderboardEntries();
  const leader = leaderboard[0];
  const activeEntry = leaderboard.find(entry => entry.id === activePlayerId);
  const rivalEntry = leaderboard.find(entry => entry.id !== activePlayerId);
  const statusCopy = activeEntry?.githubStatus === 'Live' ? getGithubSyncLabel() : activeEntry?.githubStatus === 'Token fehlt' ? 'Sync wartet auf Token' : 'Username folgt';
  setText('active-player-name', activeProfile.name);
  setText('active-player-copy', `${activeProfile.title} · @${activeEntry?.githubUsername || activePlayerId} · ${activeEntry?.scopeLabel || getRepoScopeLabel()} · ${statusCopy}`);
  document.querySelectorAll('.profile-chip').forEach(button => button.classList.toggle('active', button.dataset.player === activePlayerId));
  if (leader && activeEntry) {
    const gap = leader.id === activePlayerId ? `Du führst mit ${Math.max(0, activeEntry.score - (rivalEntry?.score || 0))} Punkten` : `${leader.name} führt mit ${Math.max(0, leader.score - activeEntry.score)} Punkten`;
    setText('leader-gap', gap);
  } else {
    setText('leader-gap', 'Noch kein Vorsprung');
  }
  setText('leaderboard-motivation', rivalEntry ? `${activeProfile.name} vs ${rivalEntry.name}: Quests und GitHub-Punkte entscheiden.` : 'Beide Profile aufbauen, um die Rivalität zu starten.');
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  if (!container) return;
  const leaderboard = getLeaderboardEntries();
  container.innerHTML = leaderboard.map((entry, index) => `<article class="leaderboard-entry ${index === 0 ? 'is-leading' : ''}"><span class="leaderboard-rank">#${index + 1}</span><div class="leaderboard-player"><strong>${escapeHtml(entry.name)}</strong><p class="leaderboard-handle">@${escapeHtml(entry.githubUsername)} · ${escapeHtml(entry.githubStatus)}</p><p class="leaderboard-detail">${escapeHtml(entry.rank)} · ${entry.quests} Quests · ${entry.bosses} Bosses · ${escapeHtml(entry.scopeLabel)}</p></div><div class="leaderboard-score"><strong>${entry.score}</strong><small>Lokal ${entry.localScore} · GitHub ${entry.githubScore}</small><small>${entry.xp} XP · ${escapeHtml(entry.githubMetrics)} · Streak ${entry.streak}</small></div></article>`).join('');
  if (leaderboard.length >= 2) {
    const lead = leaderboard[0];
    const runner = leaderboard[1];
    setText('leaderboard-summary', `${lead.name} liegt vorne, ${lead.score - runner.score} Punkte vor ${runner.name}. Lokaler Fortschritt und GitHub-Aktivität (${lead.scopeLabel}) zählen gemeinsam. ${getGithubSyncLabel()}.`);
  } else {
    setText('leaderboard-summary', 'Das Duell startet, sobald Fortschritt gesammelt wird.');
  }
}

function updateHud() {
  const rankProgress = getRankProgress();
  const currentRank = rankProgress.current;
  const nextRank = rankProgress.next;
  const currentLevel = getCurrentLevelSummary();
  const nextBadge = getNextBadge();
  const unlockedAchievements = getEarnedAchievements().length;
  setText('player-rank-name', currentRank.name);
  setText('player-rank-title', currentRank.title);
  setText('hud-xp', String(getEarnedXp()));
  setText('hud-completed', `${getCompletedCount()}/${missionsData.length}`);
  setText('hud-streak', `${playerState.streak} Tag${playerState.streak === 1 ? '' : 'e'}`);
  setText('hud-bosses', String(getCompletedBosses().length));
  setText('hud-rank-progress-label', rankProgress.label);
  setText('hud-next-rank', nextRank ? `Nächster Rang: ${nextRank.name}` : 'Rangmaximum erreicht');
  setText('summary-progress', `${getProgressPercent()}%`);
  setText('summary-progress-copy', `${getCompletedCount()} von ${missionsData.length} Quests abgeschlossen. ${getCompletedBosses().length} Boss-Siege gesammelt.`);
  setText('summary-badges', String(unlockedAchievements));
  setText('summary-badges-copy', nextBadge ? `Nächstes Badge: ${nextBadge.name} bei ${nextBadge.threshold} Quests.` : 'Alle Badge-Meilensteine sind freigeschaltet.');
  setText('summary-class', getPlayerClass());
  setText('summary-level-copy', `${currentLevel.meta.label}: ${currentLevel.meta.focus}`);
  setText('summary-level', `Level ${currentLevel.level}`);
  setText('summary-level-panel-copy', `${currentLevel.meta.name} ist dein aktueller Kampagnenfokus.`);
  setText('hud-badge', nextBadge ? nextBadge.name : 'Alle Badges');
  setText('summary-unlock-copy', nextRank ? `Bei ${nextRank.minXp} XP wartet ${nextRank.name}.` : 'Keine weiteren Rangstufen offen.');
  const bar = document.getElementById('rank-progress-bar');
  if (bar) bar.style.width = `${rankProgress.progress}%`;
}

function updateNextMission() {
  const nextMission = getNextMission();
  if (!nextMission) {
    setText('next-mission-title', 'Alle freigeschalteten Quests erledigt');
    setText('next-mission-summary', 'Prüfe Boss-Missionen, Training oder plane neue Inhalte.');
    setText('next-mission-level', 'Mastery');
    setText('next-mission-xp', `${getEarnedXp()} XP total`);
    setText('next-mission-mode', 'Standby');
    return;
  }
  setText('next-mission-title', nextMission.title);
  setText('next-mission-summary', nextMission.objective);
  setText('next-mission-level', `${LEVEL_META[nextMission.level]?.name || `Level ${nextMission.level}`}`);
  setText('next-mission-xp', `${getMissionPoints(nextMission)} XP`);
  setText('next-mission-mode', isBossMission(nextMission) ? 'Boss Quest' : 'Quest');
}

function updateBossPanel() {
  const boss = getCurrentBossTarget();
  if (!boss) {
    setText('boss-title', 'Kein offener Boss');
    setText('boss-summary', 'Alle Boss-Missionen sind abgeschlossen.');
    setText('boss-level', 'Boss Clear');
    setText('boss-xp', 'MAX');
    return;
  }
  setText('boss-title', boss.title);
  setText('boss-summary', isMissionUnlocked(boss) ? boss.objective : getLockedReason(boss));
  setText('boss-level', `${LEVEL_META[boss.level]?.name || `Level ${boss.level}`}`);
  setText('boss-xp', `${getMissionPoints(boss)} XP`);
}

function updateMissionOverview() {
  const nextMission = getNextMission();
  const openCount = missionsData.filter(mission => isMissionUnlocked(mission) && !isMissionCompleted(mission.mission_id)).length;
  setText('mission-guide-copy', nextMission ? `${openCount} Quest${openCount === 1 ? '' : 's'} aktuell spielbar. Nächster Fokus: ${nextMission.mission_id} - ${nextMission.title}.` : 'Keine offene Quest mehr in der aktuellen Freischaltung.');
  const bar = document.getElementById('mission-progress-bar');
  if (bar) bar.style.width = `${getProgressPercent()}%`;
}

function renderAchievementGrid() {
  const grid = document.getElementById('achievement-grid');
  if (!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map((achievement, index) => {
    const earned = achievement.isEarned(playerState);
    const sigil = String(index + 1).padStart(2, '0');
    return `<article class="achievement-card ${earned ? 'is-earned' : 'is-locked'}"><div class="achievement-medal">${sigil}</div><span class="badge ${earned ? 'badge-xp' : ''}">${earned ? 'Freigeschaltet' : 'Locked'}</span><h4>${escapeHtml(achievement.name)}</h4><p>${escapeHtml(achievement.description)}</p></article>`;
  }).join('');
}

function renderPracticeGrid() {
  const grid = document.getElementById('practice-grid');
  if (!grid) return;
  const done = new Set(playerState.completedPractices);
  grid.innerHTML = PRACTICE_TASKS.map((task, index) => `<article class="practice-chip ${done.has(task.id) ? 'is-complete' : ''}"><div class="practice-chip-top"><span class="practice-chip-index">${index + 1}</span><span class="badge ${done.has(task.id) ? 'badge-status' : ''}">${done.has(task.id) ? 'Gemeistert' : 'Offen'}</span></div><h4>${escapeHtml(task.title)}</h4><p>${escapeHtml(task.description)}</p><span class="badge badge-xp">${task.xp} XP</span></article>`).join('');
}

function updatePracticeSummary() {
  const completed = getCompletedPracticeCount();
  const total = PRACTICE_TASKS.length;
  const progress = Math.round((completed / total) * 100);
  const allDone = completed === total;
  setText('practice-summary-title', allDone ? 'Training Lab clear' : `${total - completed} Drills offen`);
  setText('practice-summary-copy', allDone ? `Alle Drills gemeistert. Bonus von ${PRACTICE_BONUS_XP} XP freigeschaltet.` : `${completed}/${total} Trainingseinheiten abgeschlossen. Jede Übung macht die echten Quests leichter.`);
  setText('practice-xp-total', `${getPracticeXp()} XP`);
  setText('practice-unlock-copy', allDone ? 'Der komplette Practice-Bonus ist aktiv.' : 'Jeder Drill gibt sofort Übungs-XP.');
  const bar = document.getElementById('practice-progress-bar');
  if (bar) bar.style.width = `${progress}%`;
}

function renderEventFeed() {
  const list = document.getElementById('event-feed');
  if (!list) return;
  if (playerState.eventLog.length === 0) {
    list.innerHTML = '<li>Das Live Feed füllt sich, sobald du Training oder Quests abschliesst.</li>';
    return;
  }
  list.innerHTML = playerState.eventLog.map(entry => `<li>${escapeHtml(entry)}</li>`).join('');
}

function initGlossarLinks() {
  document.querySelectorAll('.glossar-mission a[data-mission]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const missionId = link.dataset.mission;
      if (missionId) jumpToMission(missionId);
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}












