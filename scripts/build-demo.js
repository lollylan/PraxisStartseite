// Baut die statische Live-Demo fuer GitHub Pages in den Ordner docs/.
// Aufruf: npm run build:demo
//
// Die Demo nutzt die Original-Frontend-Dateien aus public/, ersetzt aber
// die Express-API durch einen fetch-Mock (docs/js/demo-data.js) mit den
// Seed-Daten aus data-defaults/. Termine, Vertretungen und Stimmungen
// werden zur Laufzeit relativ zum aktuellen Datum erzeugt.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DEFAULTS = path.join(ROOT, 'data-defaults');
const DOCS = path.join(ROOT, 'docs');
const REPO_URL = 'https://github.com/lollylan/PraxisStartseite';

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(DEFAULTS, file), 'utf8'));
}

// --- docs/ leeren und Struktur anlegen ---
fs.rmSync(DOCS, { recursive: true, force: true });
fs.mkdirSync(path.join(DOCS, 'css'), { recursive: true });
fs.mkdirSync(path.join(DOCS, 'js'), { recursive: true });

// --- CSS und JS unveraendert kopieren ---
for (const f of ['dashboard.css', 'mood-stats.css']) {
  fs.copyFileSync(path.join(PUBLIC, 'css', f), path.join(DOCS, 'css', f));
}
for (const f of ['dashboard.js', 'mood-stats.js']) {
  fs.copyFileSync(path.join(PUBLIC, 'js', f), path.join(DOCS, 'js', f));
}

// --- index.html anpassen (relative Pfade, Mock einbinden, Admin-Link raus) ---
let index = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');
index = index
  .replace('href="/css/dashboard.css"', 'href="css/dashboard.css"')
  .replace('href="/mood-stats.html"', 'href="mood-stats.html"')
  .replace(
    /<a href="\/admin\.html"[^>]*>[^<]*<\/a>/,
    `<a href="${REPO_URL}" class="admin-link" title="Quellcode auf GitHub" target="_blank" rel="noopener">&#128025;</a>`
  )
  .replace(
    '<script src="/js/dashboard.js"></script>',
    '<script src="js/demo-data.js"></script>\n  <script src="js/dashboard.js"></script>'
  )
  .replace(
    '<body>',
    `<body>\n  <div style="position:fixed;bottom:10px;left:10px;background:rgba(0,0,0,.7);color:#fff;padding:6px 12px;border-radius:8px;font-size:12px;z-index:999;">Demo mit Beispieldaten &mdash; <a href="${REPO_URL}" style="color:#8fc7ff;" target="_blank" rel="noopener">Quellcode auf GitHub</a></div>`
  );
fs.writeFileSync(path.join(DOCS, 'index.html'), index);

// --- mood-stats.html anpassen ---
let stats = fs.readFileSync(path.join(PUBLIC, 'mood-stats.html'), 'utf8');
stats = stats
  .replace('href="/css/mood-stats.css"', 'href="css/mood-stats.css"')
  .replace('<a href="/" class="back-link"', '<a href="index.html" class="back-link"')
  .replace(
    '<script src="/js/mood-stats.js"></script>',
    '<script src="js/demo-data.js"></script>\n  <script src="js/mood-stats.js"></script>'
  );
fs.writeFileSync(path.join(DOCS, 'mood-stats.html'), stats);

// --- Seed-Daten einsammeln ---
const tiles = readJSON('tiles.json');
// Lokale Tool-URLs zeigen in der Demo ins Leere
for (const t of tiles.tiles) {
  if (t.url && t.url.includes('localhost')) t.url = '#';
}
const seed = {
  settings: {
    praxisName: 'Praxis Dr. Mustermann',
    praxisSubtitle: 'Facharzt fuer Allgemeinmedizin',
    kanbanEnabled: true,
    jokesEnabled: true
  },
  tiles,
  links: readJSON('links.json'),
  staff: readJSON('staff.json'),
  jokes: readJSON('jokes.json')
};

// --- fetch-Mock generieren ---
const demoJS = `// Automatisch generiert von scripts/build-demo.js — nicht von Hand bearbeiten.
// Ersetzt die Server-API der Praxis-Startseite durch Beispieldaten im Browser.
(function () {
  'use strict';

  const SEED = ${JSON.stringify(seed, null, 2)};

  // --- Dynamische Daten relativ zu heute ---
  const today = new Date();
  function addDays(n) { const d = new Date(today); d.setDate(d.getDate() + n); return d; }
  function iso(d) { return d.toISOString().slice(0, 10); }

  const vacations = { vacations: [
    { id: 'vac-1', label: 'Sommerurlaub', startDate: iso(addDays(16)), endDate: iso(addDays(30)) },
    { id: 'vac-2', label: 'Weihnachtsferien', startDate: iso(addDays(120)), endDate: iso(addDays(130)) }
  ] };

  const coverage = { coverages: [
    { id: 'cov-1', colleagueName: 'Dr. Meier', practiceName: 'Praxis Meier', date: iso(addDays(5)), endDate: '', type: 'ganztags', halfDay: '', startTime: '', endTime: '', notes: 'Tel: 0931/12345' },
    { id: 'cov-2', colleagueName: 'Dr. Fischer', practiceName: 'Praxis Fischer', date: iso(addDays(18)), endDate: iso(addDays(21)), type: 'ganztags', halfDay: '', startTime: '', endTime: '', notes: '' },
    { id: 'cov-3', colleagueName: 'Dr. Wagner', practiceName: 'Praxis Wagner', date: iso(addDays(34)), endDate: '', type: 'zeitraum', halfDay: '', startTime: '14:00', endTime: '18:00', notes: 'Tel: 0931/98765' }
  ] };

  const kanban = { version: 1, cards: [
    { id: 'kb-demo-1', title: 'Team-Ausflug planen', column: 'idee', order: 0, createdAt: today.toISOString() },
    { id: 'kb-demo-2', title: 'Impfaktion Herbst vorbereiten', column: 'geplant', order: 0, createdAt: today.toISOString() },
    { id: 'kb-demo-3', title: 'Website aktualisieren', column: 'geplant', order: 1, createdAt: today.toISOString() },
    { id: 'kb-demo-4', title: 'Neues Terminsystem testen', column: 'umsetzung', order: 0, createdAt: today.toISOString() },
    { id: 'kb-demo-5', title: 'Wartezimmer umgestalten', column: 'erledigt', order: 0, createdAt: today.toISOString() }
  ] };

  const MOOD_COMMENTS = {
    1: ['Stressiger Tag', 'Drucker streikt schon wieder', 'Wartezimmer zum Bersten voll'],
    2: ['Geht so', 'Viel los heute', 'Montag halt'],
    3: ['Super Team!', 'Alles entspannt heute', 'Kuchen im Pausenraum!']
  };
  const moods = [];
  let moodN = 0;
  for (let back = 60; back >= 0; back--) {
    const day = addDays(-back);
    if (day.getDay() === 0 || day.getDay() === 6) continue; // Wochenende
    const count = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const mood = r < 0.55 ? 3 : r < 0.85 ? 2 : 1;
      const t = new Date(day);
      t.setHours(7 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0);
      const list = MOOD_COMMENTS[mood];
      const comment = Math.random() < 0.2 ? list[Math.floor(Math.random() * list.length)] : '';
      moods.push({ id: 'mood-demo-' + (moodN++), mood, comment, timestamp: t.toISOString() });
    }
  }

  // --- fetch-Mock ---
  const origFetch = window.fetch.bind(window);
  function json(data, status) {
    return new Response(JSON.stringify(data), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input.url;
    const apiIdx = url.indexOf('/api/');
    if (apiIdx === -1) return origFetch(input, init);

    init = init || {};
    const method = (init.method || 'GET').toUpperCase();
    const rest = url.slice(apiIdx + 5);
    const pathPart = rest.split('?')[0];
    const params = new URLSearchParams(rest.split('?')[1] || '');
    const segs = pathPart.split('/').filter(Boolean);
    const body = init.body ? JSON.parse(init.body) : {};

    // Einfache GET-Endpunkte
    if (method === 'GET') {
      if (segs[0] === 'settings' && segs[1] === 'public') return json(SEED.settings);
      if (segs[0] === 'tiles') return json(SEED.tiles);
      if (segs[0] === 'links') return json(SEED.links);
      if (segs[0] === 'staff') return json(SEED.staff);
      if (segs[0] === 'jokes') return json(SEED.jokes);
      if (segs[0] === 'vacations') return json(vacations);
      if (segs[0] === 'coverage') return json(coverage);
      if (segs[0] === 'kanban') return json(kanban);
      if (segs[0] === 'moods') {
        let result = moods;
        if (params.get('from')) {
          const from = new Date(params.get('from'));
          result = result.filter(m => new Date(m.timestamp) >= from);
        }
        if (params.get('to')) {
          const to = new Date(params.get('to'));
          to.setHours(23, 59, 59, 999);
          result = result.filter(m => new Date(m.timestamp) <= to);
        }
        return json(result);
      }
    }

    // Stimmung abgeben
    if (method === 'POST' && segs[0] === 'moods') {
      const entry = {
        id: 'mood-demo-' + (moodN++),
        mood: body.mood,
        comment: typeof body.comment === 'string' ? body.comment.trim().slice(0, 500) : '',
        timestamp: new Date().toISOString()
      };
      moods.push(entry);
      return json(entry);
    }

    // Kanban-Operationen (nur im Browser-Speicher)
    if (segs[0] === 'kanban' && segs[1] === 'cards') {
      if (method === 'POST') {
        const card = {
          id: 'kb-demo-' + Math.random().toString(16).slice(2, 10),
          title: (body.title || '').trim().slice(0, 200),
          column: body.column,
          order: kanban.cards.filter(c => c.column === body.column).length,
          createdAt: new Date().toISOString()
        };
        kanban.cards.push(card);
        kanban.version++;
        return json({ card: card, version: kanban.version });
      }
      const cardId = segs[2];
      const card = kanban.cards.find(c => c.id === cardId);
      if (!card) return json({ error: 'Karte nicht gefunden' }, 404);

      if (method === 'PUT' && segs[3] === 'move') {
        const oldColumn = card.column;
        card.column = body.column || card.column;
        const target = kanban.cards
          .filter(c => c.column === card.column && c.id !== card.id)
          .sort((a, b) => a.order - b.order);
        const insertAt = Math.min(body.order != null ? body.order : target.length, target.length);
        target.splice(insertAt, 0, card);
        target.forEach((c, i) => { c.order = i; });
        if (oldColumn !== card.column) {
          kanban.cards
            .filter(c => c.column === oldColumn)
            .sort((a, b) => a.order - b.order)
            .forEach((c, i) => { c.order = i; });
        }
        kanban.version++;
        return json({ version: kanban.version });
      }
      if (method === 'PUT') {
        if (body.title !== undefined) card.title = body.title.trim().slice(0, 200);
        kanban.version++;
        return json({ card: card, version: kanban.version });
      }
      if (method === 'DELETE') {
        kanban.cards.splice(kanban.cards.indexOf(card), 1);
        kanban.version++;
        return json({ ok: true, version: kanban.version });
      }
    }

    return json({ error: 'Nicht verfuegbar in der Demo' }, 404);
  };
})();
`;

fs.writeFileSync(path.join(DOCS, 'js', 'demo-data.js'), demoJS);

// Verhindert, dass GitHub Pages den Ordner durch Jekyll verarbeitet
fs.writeFileSync(path.join(DOCS, '.nojekyll'), '');

console.log('Demo gebaut in docs/ — Dateien:');
for (const f of fs.readdirSync(DOCS, { recursive: true })) console.log('  docs/' + String(f).replace(/\\/g, '/'));
