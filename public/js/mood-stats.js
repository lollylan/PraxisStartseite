// === Stimmungsbarometer Statistik ===

const WEEKDAYS_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = ['Januar', 'Februar', 'M\u00e4rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

let currentYear, currentMonth;
let allMoods = [];

function moodEmoji(val) {
  if (val >= 2.5) return '\ud83d\ude0a';
  if (val >= 1.5) return '\ud83d\ude10';
  return '\ud83d\ude21';
}

// Convert internal 1-3 average to 0-10 scale
function toScale10(avg) {
  return ((avg - 1) / 2 * 10).toFixed(1);
}

function moodClass(val) {
  if (val >= 2.5) return 'mood-good';
  if (val >= 1.5) return 'mood-ok';
  return 'mood-bad';
}

function formatTime(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatDateShort(ts) {
  const d = new Date(ts);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Data loading ---
async function loadMonthData() {
  const from = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const to = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const res = await fetch(`/api/moods?from=${from}&to=${to}`);
  allMoods = await res.json();

  renderMonth();
  renderMonthSummary();
  renderRecentComments();
  hideDayDetail();
}

// --- Month summary ---
function renderMonthSummary() {
  const container = document.getElementById('monthSummary');

  if (allMoods.length === 0) {
    container.innerHTML = '<div class="empty-state">Keine Eintr\u00e4ge in diesem Monat</div>';
    return;
  }

  const avg = allMoods.reduce((s, m) => s + m.mood, 0) / allMoods.length;
  const days = new Set(allMoods.map(m => m.timestamp.slice(0, 10))).size;
  const comments = allMoods.filter(m => m.comment).length;

  container.innerHTML = `
    <div class="summary-card">
      <div class="summary-value">${moodEmoji(avg)} ${toScale10(avg)} / 10</div>
      <div class="summary-label">Durchschnitt</div>
    </div>
    <div class="summary-card">
      <div class="summary-value">${allMoods.length}</div>
      <div class="summary-label">Eintr\u00e4ge</div>
    </div>
    <div class="summary-card">
      <div class="summary-value">${days}</div>
      <div class="summary-label">Tage erfasst</div>
    </div>
    <div class="summary-card">
      <div class="summary-value">${comments}</div>
      <div class="summary-label">Kommentare</div>
    </div>
  `;
}

// --- Calendar ---
function renderMonth() {
  document.getElementById('monthTitle').textContent = `${MONTHS[currentMonth]} ${currentYear}`;

  const container = document.getElementById('calendar');
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  // Group moods by day
  const byDay = {};
  for (const m of allMoods) {
    const day = m.timestamp.slice(0, 10);
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(m);
  }

  // Build calendar
  let html = WEEKDAYS_SHORT.map(d => `<div class="cal-header">${d}</div>`).join('');

  const firstDay = new Date(currentYear, currentMonth, 1);
  // Monday=0, so shift: (getDay()+6)%7
  let startPad = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Empty cells before month start
  for (let i = 0; i < startPad; i++) {
    html += '<div class="cal-day empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const entries = byDay[dateStr] || [];
    const isToday = dateStr === todayStr;
    const hasData = entries.length > 0;

    let mClass = '';
    let emoji = '';
    let count = '';

    if (hasData) {
      const avg = entries.reduce((s, m) => s + m.mood, 0) / entries.length;
      mClass = moodClass(avg);
      emoji = `<div class="cal-day-emoji">${moodEmoji(avg)}</div>`;
      count = `<div class="cal-day-count">${entries.length}</div>`;
    }

    html += `
      <div class="cal-day ${mClass} ${hasData ? 'has-data' : ''} ${isToday ? 'today' : ''}"
           ${hasData ? `onclick="showDayDetail('${dateStr}')"` : ''}>
        <div class="cal-day-num">${d}</div>
        ${emoji}
        ${count}
      </div>
    `;
  }

  container.innerHTML = html;
}

// --- Day detail ---
function showDayDetail(dateStr) {
  const entries = allMoods.filter(m => m.timestamp.slice(0, 10) === dateStr);
  if (entries.length === 0) return;

  const d = new Date(dateStr + 'T00:00:00');
  const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');

  document.getElementById('dayDetailTitle').textContent = `${dayNames[d.getDay()]}, ${dd}.${mm}.${d.getFullYear()}`;

  const sorted = [...entries].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const avg = sorted.reduce((s, m) => s + m.mood, 0) / sorted.length;

  let html = `<div style="margin-bottom:10px;font-size:0.9rem;color:var(--text-muted)">Durchschnitt: ${moodEmoji(avg)} ${toScale10(avg)} / 10 &bull; ${sorted.length} Eintr\u00e4ge</div>`;

  html += sorted.map(m => {
    const emoji = moodEmoji(m.mood);
    const time = formatTime(m.timestamp);
    const comment = m.comment
      ? `<div class="detail-comment">${escapeHtml(m.comment)}</div>`
      : '<div class="detail-no-comment">Kein Kommentar</div>';
    return `
      <div class="detail-entry">
        <div class="detail-emoji">${emoji}</div>
        <div>
          <div class="detail-time">${time} Uhr</div>
          ${comment}
        </div>
      </div>
    `;
  }).join('');

  const section = document.getElementById('dayDetail');
  document.getElementById('dayDetailBody').innerHTML = html;
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideDayDetail() {
  document.getElementById('dayDetail').style.display = 'none';
}

// --- Recent comments ---
function renderRecentComments() {
  const container = document.getElementById('recentComments');
  const withComments = allMoods
    .filter(m => m.comment)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 15);

  if (withComments.length === 0) {
    container.innerHTML = '<div class="empty-state">Keine Kommentare in diesem Monat</div>';
    return;
  }

  container.innerHTML = withComments.map(m => `
    <div class="comment-entry">
      <div class="comment-emoji">${moodEmoji(m.mood)}</div>
      <div class="comment-text">${escapeHtml(m.comment)}</div>
      <div class="comment-date">${formatDateShort(m.timestamp)} ${formatTime(m.timestamp)}</div>
    </div>
  `).join('');
}

// --- Navigation ---
document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  loadMonthData();
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  loadMonthData();
});

// --- Theme toggle (reuse pattern from dashboard) ---
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
const now = new Date();
currentYear = now.getFullYear();
currentMonth = now.getMonth();
loadMonthData();
