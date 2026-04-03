// === Praxis-Startseite Dashboard ===

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const WEEKDAYS_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MONTHS = ['Januar', 'Februar', 'Maerz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

// --- Clock ---
function updateClock() {
  const now = new Date();
  const day = WEEKDAYS_LONG[now.getDay()];
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${day}, ${dd}.${mm}.${yyyy} \u2014 ${hh}:${min}`;
}

// --- Fetch helpers ---
async function fetchJSON(url) {
  const res = await fetch(url);
  return res.json();
}

// --- Render Tiles ---
function renderTiles(data) {
  const container = document.getElementById('tilesContainer');
  const sorted = [...data.tiles].sort((a, b) => a.order - b.order);
  container.innerHTML = sorted.map(tile => `
    <a href="${escapeHtml(tile.url)}" target="_blank" rel="noopener" class="tile" style="--tile-color: ${escapeHtml(tile.color || '#1a5276')}">
      <div class="tile-icon">${tile.icon || ''}</div>
      <div class="tile-title">${escapeHtml(tile.title)}</div>
      <div class="tile-subtitle">${escapeHtml(tile.subtitle || '')}</div>
    </a>
  `).join('');
}

// --- Render Links ---
function renderLinks(data) {
  const container = document.getElementById('linksContainer');
  container.innerHTML = data.categories.map(cat => `
    <div class="link-category open">
      <div class="link-category-header" onclick="this.parentElement.classList.toggle('open')">
        <span>${cat.icon || ''} ${escapeHtml(cat.name)}</span>
        <span class="arrow">\u25B6</span>
      </div>
      <div class="link-category-body">
        ${cat.links.map(link => `
          <a href="${escapeHtml(link.url)}" ${link.newTab ? 'target="_blank" rel="noopener"' : ''}>${escapeHtml(link.title)}</a>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// --- Render Vacation Countdown ---
function renderVacation(data) {
  const body = document.getElementById('vacationBody');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find next or current vacation
  const upcoming = data.vacations
    .map(v => ({
      ...v,
      start: new Date(v.startDate),
      end: new Date(v.endDate)
    }))
    .filter(v => v.end >= today)
    .sort((a, b) => a.start - b.start);

  if (upcoming.length === 0) {
    body.innerHTML = '<div class="empty-state">Kein Urlaub geplant</div>';
    return;
  }

  const next = upcoming[0];
  const isActive = today >= next.start && today <= next.end;

  if (isActive) {
    const daysLeft = Math.ceil((next.end - today) / (1000 * 60 * 60 * 24));
    body.innerHTML = `
      <div class="vacation-countdown vacation-active">
        <div class="vacation-label">Urlaub! \ud83c\udf34</div>
        <div class="vacation-days">${daysLeft}</div>
        <div class="vacation-label">Tage verbleibend</div>
        <div class="vacation-dates">${formatDate(next.start)} \u2013 ${formatDate(next.end)}</div>
      </div>
    `;
  } else {
    const daysUntil = Math.ceil((next.start - today) / (1000 * 60 * 60 * 24));
    body.innerHTML = `
      <div class="vacation-countdown">
        <div class="vacation-label">Noch</div>
        <div class="vacation-days">${daysUntil}</div>
        <div class="vacation-label">Tage bis ${escapeHtml(next.label)}</div>
        <div class="vacation-dates">${formatDate(next.start)} \u2013 ${formatDate(next.end)}</div>
      </div>
    `;
  }
}

// --- Render Birthdays ---
function renderBirthdays(data) {
  const body = document.getElementById('birthdayBody');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thisYear = today.getFullYear();

  const withNext = data.staff.map(s => {
    const bd = new Date(s.birthday);
    let nextBd = new Date(thisYear, bd.getMonth(), bd.getDate());
    if (nextBd < today) {
      nextBd = new Date(thisYear + 1, bd.getMonth(), bd.getDate());
    }
    const daysUntil = Math.ceil((nextBd - today) / (1000 * 60 * 60 * 24));
    const turnsAge = nextBd.getFullYear() - bd.getFullYear();
    return { ...s, nextBd, daysUntil, turnsAge };
  }).sort((a, b) => a.daysUntil - b.daysUntil);

  const show = withNext.slice(0, 3);

  if (show.length === 0) {
    body.innerHTML = '<div class="empty-state">Keine Mitarbeiter hinterlegt</div>';
    return;
  }

  body.innerHTML = show.map(s => {
    const isToday = s.daysUntil === 0;
    return `
      <div class="birthday-entry ${isToday ? 'birthday-today' : ''}">
        <div>
          <div class="birthday-name">${isToday ? '\ud83c\udf82 ' : ''}${escapeHtml(s.name)}</div>
          <div class="birthday-role">${escapeHtml(s.role)} \u2022 wird ${s.turnsAge}</div>
        </div>
        <div class="birthday-days">
          ${isToday ? 'Heute!' : `in ${s.daysUntil} T.`}
        </div>
      </div>
    `;
  }).join('');
}

// --- Render Coverage ---
function renderCoverage(data) {
  const body = document.getElementById('coverageBody');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = data.coverages
    .filter(c => new Date(c.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  if (upcoming.length === 0) {
    body.innerHTML = '<div class="empty-state">Keine Vertretungen geplant</div>';
    return;
  }

  body.innerHTML = upcoming.map(c => {
    const d = new Date(c.date);
    const dayName = WEEKDAYS[d.getDay()];
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');

    // Format time display based on type
    let timeDisplay = '';
    if (c.type === 'zeitraum' && c.startTime && c.endTime) {
      timeDisplay = `${c.startTime}\u2013${c.endTime}`;
    } else if (c.type === 'halbtags') {
      timeDisplay = c.halfDay === 'vormittags' ? 'Vormittags' : 'Nachmittags';
    } else {
      timeDisplay = 'Ganztags';
    }

    // Handle date ranges
    let dateDisplay = `${dayName} ${dd}.${mm}.`;
    if (c.endDate) {
      const ed = new Date(c.endDate);
      const edd = String(ed.getDate()).padStart(2, '0');
      const emm = String(ed.getMonth() + 1).padStart(2, '0');
      dateDisplay += ` \u2013 ${WEEKDAYS[ed.getDay()]} ${edd}.${emm}.`;
    }

    return `
      <div class="coverage-entry">
        <div class="coverage-date">${dateDisplay}</div>
        <div class="coverage-name">${escapeHtml(c.colleagueName)}${c.practiceName ? ' \u2014 ' + escapeHtml(c.practiceName) : ''}</div>
        <div class="coverage-details">${escapeHtml(timeDisplay)}${c.notes ? ' \u2022 ' + escapeHtml(c.notes) : ''}</div>
      </div>
    `;
  }).join('');
}

// --- Settings ---
async function loadSettings() {
  const data = await fetchJSON('/api/settings/public');
  document.getElementById('praxisName').textContent = data.praxisName;
  document.getElementById('praxisSubtitle').textContent = data.praxisSubtitle;
  document.title = data.praxisName + ' \u2014 Startseite';
}

// --- Utils ---
function formatDate(d) {
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Load everything ---
async function loadAll() {
  try {
    const [tiles, links, staff, vacations, coverage] = await Promise.all([
      fetchJSON('/api/tiles'),
      fetchJSON('/api/links'),
      fetchJSON('/api/staff'),
      fetchJSON('/api/vacations'),
      fetchJSON('/api/coverage')
    ]);
    renderTiles(tiles);
    renderLinks(links);
    renderBirthdays(staff);
    renderVacation(vacations);
    renderCoverage(coverage);
  } catch (err) {
    console.error('Fehler beim Laden:', err);
  }
}

// --- Theme Toggle ---
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '\u263E' : '\u2600';
}

document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// --- Init ---
initTheme();
updateClock();
setInterval(updateClock, 10000);
loadSettings();
loadAll();

// Auto-refresh every 60 seconds
setInterval(loadAll, 60000);

// Refresh when tab becomes visible again
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateClock();
    loadAll();
  }
});
