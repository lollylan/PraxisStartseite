const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

// --- Paths ---
const DATA_DIR = path.join(__dirname, 'data');
const DEFAULTS_DIR = path.join(__dirname, 'data-defaults');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');

// --- First-Run: copy defaults to data/ if missing ---
function initData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const defaults = fs.readdirSync(DEFAULTS_DIR).filter(f => f.endsWith('.json'));
  for (const file of defaults) {
    const target = path.join(DATA_DIR, file);
    if (!fs.existsSync(target)) {
      fs.copyFileSync(path.join(DEFAULTS_DIR, file), target);
      console.log(`[Init] ${file} aus Vorlagen kopiert.`);
    }
  }

  // Generate session secret if not present in settings
  const settingsPath = path.join(DATA_DIR, 'settings.json');
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  if (!settings.sessionSecret || settings.sessionSecret === '<auto-generiert>') {
    settings.sessionSecret = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
    console.log('[Init] Session-Secret generiert.');
  }
  return settings;
}

const settings = initData();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: settings.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 Minuten
}));
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// --- Start ---
const PORT = settings.serverPort || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Praxis-Startseite laeuft auf:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`  Admin: http://localhost:${PORT}/admin.html\n`);
});
