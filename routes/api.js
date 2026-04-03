const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const router = express.Router();
const DATA_DIR = path.join(__dirname, '..', 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const MAX_BACKUPS = 50;

// --- Helpers ---

function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);

  // Backup before writing
  if (fs.existsSync(filePath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `${path.basename(filename, '.json')}.${timestamp}.json`;
    fs.copyFileSync(filePath, path.join(BACKUP_DIR, backupName));
    cleanOldBackups(path.basename(filename, '.json'));
  }

  // Atomic write
  const tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, filePath);
}

function cleanOldBackups(prefix) {
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith(prefix + '.'))
    .sort()
    .reverse();
  for (const f of files.slice(MAX_BACKUPS)) {
    fs.unlinkSync(path.join(BACKUP_DIR, f));
  }
}

function requireAuth(req, res, next) {
  if (!req.session.authenticated) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }
  next();
}

function generateId(prefix) {
  return `${prefix}-${crypto.randomBytes(4).toString('hex')}`;
}

// ============================
// PUBLIC GET endpoints (no auth)
// ============================

router.get('/tiles', (req, res) => {
  res.json(readJSON('tiles.json'));
});

router.get('/links', (req, res) => {
  res.json(readJSON('links.json'));
});

router.get('/staff', (req, res) => {
  res.json(readJSON('staff.json'));
});

router.get('/vacations', (req, res) => {
  res.json(readJSON('vacations.json'));
});

router.get('/coverage', (req, res) => {
  res.json(readJSON('coverage.json'));
});

router.get('/moods', (req, res) => {
  let moods = readJSON('moods.json');
  const { from, to } = req.query;
  if (from) {
    const fromDate = new Date(from);
    moods = moods.filter(m => new Date(m.timestamp) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    moods = moods.filter(m => new Date(m.timestamp) <= toDate);
  }
  res.json(moods);
});

// Post mood (no auth — MFAs use this without login)
router.post('/moods', (req, res) => {
  const { mood, comment } = req.body;
  if (![1, 2, 3].includes(mood)) {
    return res.status(400).json({ error: 'Mood muss 1, 2 oder 3 sein' });
  }
  const moods = readJSON('moods.json');
  const entry = {
    id: generateId('mood'),
    mood,
    comment: typeof comment === 'string' ? comment.trim().slice(0, 500) : '',
    timestamp: new Date().toISOString()
  };
  moods.push(entry);
  writeJSON('moods.json', moods);
  res.json(entry);
});

router.get('/settings/public', (req, res) => {
  const s = readJSON('settings.json');
  res.json({ praxisName: s.praxisName, praxisSubtitle: s.praxisSubtitle, kanbanEnabled: s.kanbanEnabled !== false });
});

// ============================
// TILES CRUD (auth required)
// ============================

router.post('/tiles', requireAuth, (req, res) => {
  const data = readJSON('tiles.json');
  const tile = { id: generateId('tile'), ...req.body, order: data.tiles.length + 1 };
  data.tiles.push(tile);
  writeJSON('tiles.json', data);
  res.json(tile);
});

router.put('/tiles/:id', requireAuth, (req, res) => {
  const data = readJSON('tiles.json');
  const idx = data.tiles.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Nicht gefunden' });
  data.tiles[idx] = { ...data.tiles[idx], ...req.body, id: req.params.id };
  writeJSON('tiles.json', data);
  res.json(data.tiles[idx]);
});

router.delete('/tiles/:id', requireAuth, (req, res) => {
  const data = readJSON('tiles.json');
  data.tiles = data.tiles.filter(t => t.id !== req.params.id);
  writeJSON('tiles.json', data);
  res.json({ ok: true });
});

// ============================
// LINKS CRUD (auth required)
// ============================

// Add category
router.post('/links/categories', requireAuth, (req, res) => {
  const data = readJSON('links.json');
  const cat = { id: generateId('cat'), name: req.body.name, icon: req.body.icon || '', links: [] };
  data.categories.push(cat);
  writeJSON('links.json', data);
  res.json(cat);
});

// Update category
router.put('/links/categories/:id', requireAuth, (req, res) => {
  const data = readJSON('links.json');
  const cat = data.categories.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ error: 'Nicht gefunden' });
  if (req.body.name !== undefined) cat.name = req.body.name;
  if (req.body.icon !== undefined) cat.icon = req.body.icon;
  writeJSON('links.json', data);
  res.json(cat);
});

// Delete category
router.delete('/links/categories/:id', requireAuth, (req, res) => {
  const data = readJSON('links.json');
  data.categories = data.categories.filter(c => c.id !== req.params.id);
  writeJSON('links.json', data);
  res.json({ ok: true });
});

// Add link to category
router.post('/links/categories/:catId/links', requireAuth, (req, res) => {
  const data = readJSON('links.json');
  const cat = data.categories.find(c => c.id === req.params.catId);
  if (!cat) return res.status(404).json({ error: 'Kategorie nicht gefunden' });
  const link = { id: generateId('link'), title: req.body.title, url: req.body.url, newTab: req.body.newTab !== false };
  cat.links.push(link);
  writeJSON('links.json', data);
  res.json(link);
});

// Update link
router.put('/links/links/:id', requireAuth, (req, res) => {
  const data = readJSON('links.json');
  for (const cat of data.categories) {
    const link = cat.links.find(l => l.id === req.params.id);
    if (link) {
      Object.assign(link, req.body, { id: req.params.id });
      writeJSON('links.json', data);
      return res.json(link);
    }
  }
  res.status(404).json({ error: 'Nicht gefunden' });
});

// Delete link
router.delete('/links/links/:id', requireAuth, (req, res) => {
  const data = readJSON('links.json');
  for (const cat of data.categories) {
    const idx = cat.links.findIndex(l => l.id === req.params.id);
    if (idx !== -1) {
      cat.links.splice(idx, 1);
      writeJSON('links.json', data);
      return res.json({ ok: true });
    }
  }
  res.status(404).json({ error: 'Nicht gefunden' });
});

// ============================
// STAFF CRUD (auth required)
// ============================

router.post('/staff', requireAuth, (req, res) => {
  const data = readJSON('staff.json');
  const entry = { id: generateId('staff'), ...req.body };
  data.staff.push(entry);
  writeJSON('staff.json', data);
  res.json(entry);
});

router.put('/staff/:id', requireAuth, (req, res) => {
  const data = readJSON('staff.json');
  const idx = data.staff.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Nicht gefunden' });
  data.staff[idx] = { ...data.staff[idx], ...req.body, id: req.params.id };
  writeJSON('staff.json', data);
  res.json(data.staff[idx]);
});

router.delete('/staff/:id', requireAuth, (req, res) => {
  const data = readJSON('staff.json');
  data.staff = data.staff.filter(s => s.id !== req.params.id);
  writeJSON('staff.json', data);
  res.json({ ok: true });
});

// ============================
// VACATIONS CRUD (auth required)
// ============================

router.post('/vacations', requireAuth, (req, res) => {
  const data = readJSON('vacations.json');
  const entry = { id: generateId('vac'), ...req.body };
  data.vacations.push(entry);
  writeJSON('vacations.json', data);
  res.json(entry);
});

router.put('/vacations/:id', requireAuth, (req, res) => {
  const data = readJSON('vacations.json');
  const idx = data.vacations.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Nicht gefunden' });
  data.vacations[idx] = { ...data.vacations[idx], ...req.body, id: req.params.id };
  writeJSON('vacations.json', data);
  res.json(data.vacations[idx]);
});

router.delete('/vacations/:id', requireAuth, (req, res) => {
  const data = readJSON('vacations.json');
  data.vacations = data.vacations.filter(v => v.id !== req.params.id);
  writeJSON('vacations.json', data);
  res.json({ ok: true });
});

// ============================
// COVERAGE CRUD (auth required)
// ============================

router.post('/coverage', requireAuth, (req, res) => {
  const data = readJSON('coverage.json');
  const entry = { id: generateId('cov'), ...req.body };
  data.coverages.push(entry);
  writeJSON('coverage.json', data);
  res.json(entry);
});

router.put('/coverage/:id', requireAuth, (req, res) => {
  const data = readJSON('coverage.json');
  const idx = data.coverages.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Nicht gefunden' });
  data.coverages[idx] = { ...data.coverages[idx], ...req.body, id: req.params.id };
  writeJSON('coverage.json', data);
  res.json(data.coverages[idx]);
});

router.delete('/coverage/:id', requireAuth, (req, res) => {
  const data = readJSON('coverage.json');
  data.coverages = data.coverages.filter(c => c.id !== req.params.id);
  writeJSON('coverage.json', data);
  res.json({ ok: true });
});

// ============================
// SETTINGS (auth required)
// ============================

router.get('/settings', requireAuth, (req, res) => {
  const s = readJSON('settings.json');
  // Don't expose hash or secret
  res.json({
    praxisName: s.praxisName,
    praxisSubtitle: s.praxisSubtitle,
    serverPort: s.serverPort,
    defaultPassword: !!s.defaultPassword,
    kanbanEnabled: s.kanbanEnabled !== false
  });
});

router.put('/settings', requireAuth, (req, res) => {
  const s = readJSON('settings.json');
  if (req.body.praxisName !== undefined) s.praxisName = req.body.praxisName;
  if (req.body.praxisSubtitle !== undefined) s.praxisSubtitle = req.body.praxisSubtitle;
  if (req.body.kanbanEnabled !== undefined) s.kanbanEnabled = !!req.body.kanbanEnabled;
  writeJSON('settings.json', s);
  res.json({ ok: true });
});

// ============================
// KANBAN BOARD (public read, public write with optimistic locking)
// ============================

router.get('/kanban', (req, res) => {
  res.json(readJSON('kanban.json'));
});

// Add a new card
router.post('/kanban/cards', (req, res) => {
  const data = readJSON('kanban.json');
  const { title, column, version } = req.body;
  if (!title || !column) {
    return res.status(400).json({ error: 'Titel und Spalte sind Pflichtfelder' });
  }
  if (version !== undefined && version !== data.version) {
    return res.status(409).json({ error: 'Konflikt: Board wurde zwischenzeitlich geaendert', currentVersion: data.version });
  }
  const card = {
    id: generateId('kb'),
    title: title.trim().slice(0, 200),
    column,
    order: data.cards.filter(c => c.column === column).length,
    createdAt: new Date().toISOString()
  };
  data.cards.push(card);
  data.version++;
  writeJSON('kanban.json', data);
  res.json({ card, version: data.version });
});

// Move a card (change column and/or order)
router.put('/kanban/cards/:id/move', (req, res) => {
  const data = readJSON('kanban.json');
  const { column, order, version } = req.body;
  if (version !== undefined && version !== data.version) {
    return res.status(409).json({ error: 'Konflikt: Board wurde zwischenzeitlich geaendert', currentVersion: data.version });
  }
  const card = data.cards.find(c => c.id === req.params.id);
  if (!card) return res.status(404).json({ error: 'Karte nicht gefunden' });

  const oldColumn = card.column;
  card.column = column || card.column;

  // Reorder cards in target column
  const targetCards = data.cards
    .filter(c => c.column === card.column && c.id !== card.id)
    .sort((a, b) => a.order - b.order);

  const insertAt = Math.min(order ?? targetCards.length, targetCards.length);
  targetCards.splice(insertAt, 0, card);
  targetCards.forEach((c, i) => { c.order = i; });

  // Reorder old column if card moved between columns
  if (oldColumn !== card.column) {
    const oldCards = data.cards
      .filter(c => c.column === oldColumn)
      .sort((a, b) => a.order - b.order);
    oldCards.forEach((c, i) => { c.order = i; });
  }

  data.version++;
  writeJSON('kanban.json', data);
  res.json({ version: data.version });
});

// Update card title
router.put('/kanban/cards/:id', (req, res) => {
  const data = readJSON('kanban.json');
  const { title, version } = req.body;
  if (version !== undefined && version !== data.version) {
    return res.status(409).json({ error: 'Konflikt: Board wurde zwischenzeitlich geaendert', currentVersion: data.version });
  }
  const card = data.cards.find(c => c.id === req.params.id);
  if (!card) return res.status(404).json({ error: 'Karte nicht gefunden' });
  if (title !== undefined) card.title = title.trim().slice(0, 200);
  data.version++;
  writeJSON('kanban.json', data);
  res.json({ card, version: data.version });
});

// Delete a card
router.delete('/kanban/cards/:id', (req, res) => {
  const data = readJSON('kanban.json');
  const version = parseInt(req.query.version);
  if (!isNaN(version) && version !== data.version) {
    return res.status(409).json({ error: 'Konflikt: Board wurde zwischenzeitlich geaendert', currentVersion: data.version });
  }
  const idx = data.cards.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Karte nicht gefunden' });
  data.cards.splice(idx, 1);
  data.version++;
  writeJSON('kanban.json', data);
  res.json({ ok: true, version: data.version });
});

module.exports = router;
