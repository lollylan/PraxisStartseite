const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const SETTINGS_PATH = path.join(__dirname, '..', 'data', 'settings.json');

function readSettings() {
  return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
}

function writeSettings(data) {
  const tmp = SETTINGS_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, SETTINGS_PATH);
}

// Login
router.post('/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Passwort erforderlich' });

  const settings = readSettings();
  const match = await bcrypt.compare(password, settings.adminPasswordHash);
  if (!match) return res.status(401).json({ error: 'Falsches Passwort' });

  req.session.authenticated = true;
  res.json({ ok: true, defaultPassword: !!settings.defaultPassword });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// Status
router.get('/status', (req, res) => {
  res.json({ authenticated: !!req.session.authenticated });
});

// Change password
router.post('/change-password', async (req, res) => {
  if (!req.session.authenticated) return res.status(401).json({ error: 'Nicht eingeloggt' });

  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Neues Passwort muss mindestens 4 Zeichen haben' });
  }

  const settings = readSettings();
  const match = await bcrypt.compare(currentPassword, settings.adminPasswordHash);
  if (!match) return res.status(401).json({ error: 'Aktuelles Passwort falsch' });

  settings.adminPasswordHash = await bcrypt.hash(newPassword, 10);
  delete settings.defaultPassword;
  writeSettings(settings);
  res.json({ ok: true });
});

module.exports = router;
