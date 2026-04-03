// === Admin Panel Logic ===

const Admin = {
  editingId: null,

  // --- API helpers ---
  async api(url, method = 'GET', body = null) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Fehler');
    return data;
  },

  // ============================
  // AUTH
  // ============================
  async login(e) {
    e.preventDefault();
    const pw = document.getElementById('loginPassword').value;
    try {
      const data = await Admin.api('/api/auth/login', 'POST', { password: pw });
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminPanel').style.display = 'block';
      Admin.loadAll();
      if (data.defaultPassword) {
        alert('Bitte aendere das Standard-Passwort unter Einstellungen!');
      }
    } catch (err) {
      document.getElementById('loginError').textContent = err.message;
    }
  },

  async logout() {
    await Admin.api('/api/auth/logout', 'POST');
    location.reload();
  },

  async checkAuth() {
    try {
      const data = await Admin.api('/api/auth/status');
      if (data.authenticated) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        Admin.loadAll();
      }
    } catch (e) { /* not logged in */ }
  },

  // ============================
  // LOAD ALL DATA
  // ============================
  async loadAll() {
    await Promise.all([
      Admin.loadTiles(),
      Admin.loadLinks(),
      Admin.loadStaff(),
      Admin.loadVacations(),
      Admin.loadCoverage(),
      Admin.loadSettings()
    ]);
  },

  // ============================
  // TILES
  // ============================
  async loadTiles() {
    const data = await Admin.api('/api/tiles');
    const list = document.getElementById('tilesList');
    const sorted = [...data.tiles].sort((a, b) => a.order - b.order);
    list.innerHTML = sorted.map(t => `
      <div class="item-row">
        <div class="item-info">
          <div class="item-title">${t.icon || ''} ${esc(t.title)}</div>
          <div class="item-meta">${esc(t.subtitle || '')} &middot; ${esc(t.url)}</div>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="Admin.showTileForm('${t.id}')">Bearbeiten</button>
          <button class="btn-delete" onclick="Admin.deleteTile('${t.id}')">Loeschen</button>
        </div>
      </div>
    `).join('');
  },

  async showTileForm(id = null) {
    Admin.editingId = id;
    let tile = { title: '', subtitle: '', icon: '', color: '#1a5276', url: '', type: 'web', order: 1 };
    if (id) {
      const data = await Admin.api('/api/tiles');
      tile = data.tiles.find(t => t.id === id) || tile;
    }
    const form = document.getElementById('tileForm');
    form.style.display = 'block';
    form.innerHTML = `
      <h3>${id ? 'Kachel bearbeiten' : 'Neue Kachel'}</h3>
      <div class="form-grid">
        <div class="form-field"><label>Titel</label><input id="fTileTitle" value="${esc(tile.title)}"></div>
        <div class="form-field"><label>Untertitel</label><input id="fTileSub" value="${esc(tile.subtitle || '')}"></div>
        <div class="form-field"><label>Icon (Emoji)</label><input id="fTileIcon" value="${tile.icon || ''}" maxlength="4"></div>
        <div class="form-field"><label>Farbe</label><input id="fTileColor" type="color" value="${tile.color || '#1a5276'}"></div>
        <div class="form-field full"><label>URL</label><input id="fTileUrl" value="${esc(tile.url)}" placeholder="https://..."></div>
        <div class="form-field"><label>Typ</label>
          <select id="fTileType">
            <option value="web" ${tile.type === 'web' ? 'selected' : ''}>Web</option>
            <option value="local" ${tile.type === 'local' ? 'selected' : ''}>Lokal (LAN)</option>
          </select>
        </div>
        <div class="form-field"><label>Reihenfolge</label><input id="fTileOrder" type="number" value="${tile.order}" min="1"></div>
      </div>
      <div class="form-actions">
        <button class="btn-save" onclick="Admin.saveTile()">Speichern</button>
        <button class="btn-cancel" onclick="Admin.hideForm('tileForm')">Abbrechen</button>
      </div>
    `;
    form.scrollIntoView({ behavior: 'smooth' });
  },

  async saveTile() {
    const body = {
      title: document.getElementById('fTileTitle').value,
      subtitle: document.getElementById('fTileSub').value,
      icon: document.getElementById('fTileIcon').value,
      color: document.getElementById('fTileColor').value,
      url: document.getElementById('fTileUrl').value,
      type: document.getElementById('fTileType').value,
      order: parseInt(document.getElementById('fTileOrder').value) || 1
    };
    if (!body.title || !body.url) return alert('Titel und URL sind Pflichtfelder.');
    if (Admin.editingId) {
      await Admin.api(`/api/tiles/${Admin.editingId}`, 'PUT', body);
    } else {
      await Admin.api('/api/tiles', 'POST', body);
    }
    Admin.hideForm('tileForm');
    Admin.loadTiles();
  },

  async deleteTile(id) {
    if (!confirm('Kachel wirklich loeschen?')) return;
    await Admin.api(`/api/tiles/${id}`, 'DELETE');
    Admin.loadTiles();
  },

  // ============================
  // LINKS
  // ============================
  async loadLinks() {
    const data = await Admin.api('/api/links');
    const list = document.getElementById('linksList');
    list.innerHTML = data.categories.map(cat => `
      <div class="category-block">
        <div class="category-header">
          <span class="category-header-left">${cat.icon || ''} ${esc(cat.name)}</span>
          <div class="item-actions">
            <button class="btn-edit" onclick="Admin.showCategoryForm('${cat.id}')">Bearbeiten</button>
            <button class="btn-delete" onclick="Admin.deleteCategory('${cat.id}')">Loeschen</button>
          </div>
        </div>
        <div class="category-links">
          ${cat.links.map(link => `
            <div class="link-row">
              <div class="item-info">
                <div class="item-title">${esc(link.title)}</div>
                <div class="item-meta">${esc(link.url)}</div>
              </div>
              <div class="item-actions">
                <button class="btn-edit" onclick="Admin.showLinkForm('${cat.id}', '${link.id}')">Bearbeiten</button>
                <button class="btn-delete" onclick="Admin.deleteLink('${link.id}')">Loeschen</button>
              </div>
            </div>
          `).join('')}
          <button class="btn-add-link" onclick="Admin.showLinkForm('${cat.id}')">+ Link hinzufuegen</button>
        </div>
      </div>
    `).join('');
  },

  async showCategoryForm(id = null) {
    Admin.editingId = id;
    let cat = { name: '', icon: '' };
    if (id) {
      const data = await Admin.api('/api/links');
      cat = data.categories.find(c => c.id === id) || cat;
    }
    const form = document.getElementById('categoryForm');
    form.style.display = 'block';
    form.innerHTML = `
      <h3>${id ? 'Kategorie bearbeiten' : 'Neue Kategorie'}</h3>
      <div class="form-grid">
        <div class="form-field"><label>Name</label><input id="fCatName" value="${esc(cat.name)}"></div>
        <div class="form-field"><label>Icon (Emoji)</label><input id="fCatIcon" value="${cat.icon || ''}" maxlength="4"></div>
      </div>
      <div class="form-actions">
        <button class="btn-save" onclick="Admin.saveCategory()">Speichern</button>
        <button class="btn-cancel" onclick="Admin.hideForm('categoryForm')">Abbrechen</button>
      </div>
    `;
  },

  async saveCategory() {
    const body = {
      name: document.getElementById('fCatName').value,
      icon: document.getElementById('fCatIcon').value
    };
    if (!body.name) return alert('Name ist Pflichtfeld.');
    if (Admin.editingId) {
      await Admin.api(`/api/links/categories/${Admin.editingId}`, 'PUT', body);
    } else {
      await Admin.api('/api/links/categories', 'POST', body);
    }
    Admin.hideForm('categoryForm');
    Admin.loadLinks();
  },

  async deleteCategory(id) {
    if (!confirm('Kategorie und alle Links darin loeschen?')) return;
    await Admin.api(`/api/links/categories/${id}`, 'DELETE');
    Admin.loadLinks();
  },

  async showLinkForm(catId, linkId = null) {
    Admin.editingId = linkId;
    Admin._currentCatId = catId;
    let link = { title: '', url: '', newTab: true };
    if (linkId) {
      const data = await Admin.api('/api/links');
      for (const cat of data.categories) {
        const found = cat.links.find(l => l.id === linkId);
        if (found) { link = found; break; }
      }
    }
    const form = document.getElementById('categoryForm');
    form.style.display = 'block';
    form.innerHTML = `
      <h3>${linkId ? 'Link bearbeiten' : 'Neuer Link'}</h3>
      <div class="form-grid">
        <div class="form-field"><label>Titel</label><input id="fLinkTitle" value="${esc(link.title)}"></div>
        <div class="form-field full"><label>URL</label><input id="fLinkUrl" value="${esc(link.url)}" placeholder="https://..."></div>
        <div class="form-field"><label>In neuem Tab oeffnen</label>
          <select id="fLinkNewTab">
            <option value="true" ${link.newTab !== false ? 'selected' : ''}>Ja</option>
            <option value="false" ${link.newTab === false ? 'selected' : ''}>Nein</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-save" onclick="Admin.saveLink()">Speichern</button>
        <button class="btn-cancel" onclick="Admin.hideForm('categoryForm')">Abbrechen</button>
      </div>
    `;
  },

  async saveLink() {
    const body = {
      title: document.getElementById('fLinkTitle').value,
      url: document.getElementById('fLinkUrl').value,
      newTab: document.getElementById('fLinkNewTab').value === 'true'
    };
    if (!body.title || !body.url) return alert('Titel und URL sind Pflichtfelder.');
    if (Admin.editingId) {
      await Admin.api(`/api/links/links/${Admin.editingId}`, 'PUT', body);
    } else {
      await Admin.api(`/api/links/categories/${Admin._currentCatId}/links`, 'POST', body);
    }
    Admin.hideForm('categoryForm');
    Admin.loadLinks();
  },

  async deleteLink(id) {
    if (!confirm('Link wirklich loeschen?')) return;
    await Admin.api(`/api/links/links/${id}`, 'DELETE');
    Admin.loadLinks();
  },

  // ============================
  // STAFF
  // ============================
  async loadStaff() {
    const data = await Admin.api('/api/staff');
    const list = document.getElementById('staffList');
    list.innerHTML = data.staff.map(s => {
      const bd = new Date(s.birthday);
      const dateStr = `${String(bd.getDate()).padStart(2, '0')}.${String(bd.getMonth() + 1).padStart(2, '0')}.${bd.getFullYear()}`;
      return `
        <div class="item-row">
          <div class="item-info">
            <div class="item-title">${esc(s.name)}</div>
            <div class="item-meta">${esc(s.role)} &middot; ${dateStr}</div>
          </div>
          <div class="item-actions">
            <button class="btn-edit" onclick="Admin.showStaffForm('${s.id}')">Bearbeiten</button>
            <button class="btn-delete" onclick="Admin.deleteStaff('${s.id}')">Loeschen</button>
          </div>
        </div>
      `;
    }).join('');
  },

  async showStaffForm(id = null) {
    Admin.editingId = id;
    let staff = { name: '', role: 'MFA', birthday: '' };
    if (id) {
      const data = await Admin.api('/api/staff');
      staff = data.staff.find(s => s.id === id) || staff;
    }
    const form = document.getElementById('staffForm');
    form.style.display = 'block';
    form.innerHTML = `
      <h3>${id ? 'Mitarbeiter bearbeiten' : 'Neuer Mitarbeiter'}</h3>
      <div class="form-grid">
        <div class="form-field"><label>Name</label><input id="fStaffName" value="${esc(staff.name)}"></div>
        <div class="form-field"><label>Rolle</label>
          <select id="fStaffRole">
            <option value="MFA" ${staff.role === 'MFA' ? 'selected' : ''}>MFA</option>
            <option value="VERAH" ${staff.role === 'VERAH' ? 'selected' : ''}>VERAH</option>
            <option value="Azubi" ${staff.role === 'Azubi' ? 'selected' : ''}>Azubi</option>
            <option value="Arzt" ${staff.role === 'Arzt' ? 'selected' : ''}>Arzt</option>
            <option value="Sonstige" ${staff.role === 'Sonstige' ? 'selected' : ''}>Sonstige</option>
          </select>
        </div>
        <div class="form-field"><label>Geburtstag</label><input id="fStaffBday" type="date" value="${staff.birthday}"></div>
      </div>
      <div class="form-actions">
        <button class="btn-save" onclick="Admin.saveStaff()">Speichern</button>
        <button class="btn-cancel" onclick="Admin.hideForm('staffForm')">Abbrechen</button>
      </div>
    `;
  },

  async saveStaff() {
    const body = {
      name: document.getElementById('fStaffName').value,
      role: document.getElementById('fStaffRole').value,
      birthday: document.getElementById('fStaffBday').value
    };
    if (!body.name || !body.birthday) return alert('Name und Geburtstag sind Pflichtfelder.');
    if (Admin.editingId) {
      await Admin.api(`/api/staff/${Admin.editingId}`, 'PUT', body);
    } else {
      await Admin.api('/api/staff', 'POST', body);
    }
    Admin.hideForm('staffForm');
    Admin.loadStaff();
  },

  async deleteStaff(id) {
    if (!confirm('Mitarbeiter wirklich loeschen?')) return;
    await Admin.api(`/api/staff/${id}`, 'DELETE');
    Admin.loadStaff();
  },

  // ============================
  // VACATIONS
  // ============================
  async loadVacations() {
    const data = await Admin.api('/api/vacations');
    const list = document.getElementById('vacationsList');
    list.innerHTML = data.vacations.map(v => `
      <div class="item-row">
        <div class="item-info">
          <div class="item-title">${esc(v.label)}</div>
          <div class="item-meta">${v.startDate} bis ${v.endDate}</div>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="Admin.showVacationForm('${v.id}')">Bearbeiten</button>
          <button class="btn-delete" onclick="Admin.deleteVacation('${v.id}')">Loeschen</button>
        </div>
      </div>
    `).join('');
  },

  async showVacationForm(id = null) {
    Admin.editingId = id;
    let vac = { label: '', startDate: '', endDate: '' };
    if (id) {
      const data = await Admin.api('/api/vacations');
      vac = data.vacations.find(v => v.id === id) || vac;
    }
    const form = document.getElementById('vacationForm');
    form.style.display = 'block';
    form.innerHTML = `
      <h3>${id ? 'Urlaub bearbeiten' : 'Neuer Urlaub'}</h3>
      <div class="form-grid">
        <div class="form-field full"><label>Bezeichnung</label><input id="fVacLabel" value="${esc(vac.label)}" placeholder="z.B. Sommerurlaub"></div>
        <div class="form-field"><label>Von</label><input id="fVacStart" type="date" value="${vac.startDate}"></div>
        <div class="form-field"><label>Bis</label><input id="fVacEnd" type="date" value="${vac.endDate}"></div>
      </div>
      <div class="form-actions">
        <button class="btn-save" onclick="Admin.saveVacation()">Speichern</button>
        <button class="btn-cancel" onclick="Admin.hideForm('vacationForm')">Abbrechen</button>
      </div>
    `;
  },

  async saveVacation() {
    const body = {
      label: document.getElementById('fVacLabel').value,
      startDate: document.getElementById('fVacStart').value,
      endDate: document.getElementById('fVacEnd').value
    };
    if (!body.label || !body.startDate || !body.endDate) return alert('Alle Felder sind Pflichtfelder.');
    if (Admin.editingId) {
      await Admin.api(`/api/vacations/${Admin.editingId}`, 'PUT', body);
    } else {
      await Admin.api('/api/vacations', 'POST', body);
    }
    Admin.hideForm('vacationForm');
    Admin.loadVacations();
  },

  async deleteVacation(id) {
    if (!confirm('Urlaub wirklich loeschen?')) return;
    await Admin.api(`/api/vacations/${id}`, 'DELETE');
    Admin.loadVacations();
  },

  // ============================
  // COVERAGE
  // ============================
  async loadCoverage() {
    const data = await Admin.api('/api/coverage');
    const list = document.getElementById('coverageList');
    list.innerHTML = data.coverages
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(c => {
        let timeInfo = '';
        if (c.type === 'zeitraum' && c.startTime && c.endTime) {
          timeInfo = `${c.startTime}\u2013${c.endTime}`;
        } else if (c.type === 'halbtags') {
          timeInfo = c.halfDay === 'vormittags' ? 'Vormittags' : 'Nachmittags';
        } else {
          timeInfo = 'Ganztags';
        }
        const dateInfo = c.endDate ? `${c.date} bis ${c.endDate}` : c.date;
        return `
          <div class="item-row">
            <div class="item-info">
              <div class="item-title">${esc(c.colleagueName)} ${c.practiceName ? '&mdash; ' + esc(c.practiceName) : ''}</div>
              <div class="item-meta">${dateInfo} &middot; ${esc(timeInfo)} ${c.notes ? '&middot; ' + esc(c.notes) : ''}</div>
            </div>
            <div class="item-actions">
              <button class="btn-edit" onclick="Admin.showCoverageForm('${c.id}')">Bearbeiten</button>
              <button class="btn-delete" onclick="Admin.deleteCoverage('${c.id}')">Loeschen</button>
            </div>
          </div>
        `;
      }).join('');
  },

  async showCoverageForm(id = null) {
    Admin.editingId = id;
    let cov = { colleagueName: '', practiceName: '', date: '', endDate: '', type: 'ganztags', halfDay: 'vormittags', startTime: '', endTime: '', notes: '' };
    if (id) {
      const data = await Admin.api('/api/coverage');
      cov = { ...cov, ...(data.coverages.find(c => c.id === id) || {}) };
    }
    const form = document.getElementById('coverageForm');
    form.style.display = 'block';
    form.innerHTML = `
      <h3>${id ? 'Vertretung bearbeiten' : 'Neue Vertretung'}</h3>
      <div class="form-grid">
        <div class="form-field"><label>Kollegenname</label><input id="fCovName" value="${esc(cov.colleagueName)}"></div>
        <div class="form-field"><label>Praxisname</label><input id="fCovPraxis" value="${esc(cov.practiceName || '')}"></div>
        <div class="form-field"><label>Von (Datum)</label><input id="fCovDate" type="date" value="${cov.date}"></div>
        <div class="form-field"><label>Bis (Datum, optional)</label><input id="fCovEndDate" type="date" value="${cov.endDate || ''}"></div>
        <div class="form-field"><label>Art</label>
          <select id="fCovType" onchange="Admin.toggleCoverageFields()">
            <option value="ganztags" ${cov.type === 'ganztags' ? 'selected' : ''}>Ganztags</option>
            <option value="halbtags" ${cov.type === 'halbtags' ? 'selected' : ''}>Halbtags</option>
            <option value="zeitraum" ${cov.type === 'zeitraum' ? 'selected' : ''}>Bestimmter Zeitraum</option>
          </select>
        </div>
        <div class="form-field" id="fCovHalfDayField" style="display:${cov.type === 'halbtags' ? 'flex' : 'none'}">
          <label>Welche Haelfte</label>
          <select id="fCovHalfDay">
            <option value="vormittags" ${cov.halfDay === 'vormittags' ? 'selected' : ''}>Vormittags</option>
            <option value="nachmittags" ${cov.halfDay === 'nachmittags' ? 'selected' : ''}>Nachmittags</option>
          </select>
        </div>
        <div class="form-field" id="fCovStartTimeField" style="display:${cov.type === 'zeitraum' ? 'flex' : 'none'}">
          <label>Von (Uhrzeit)</label>
          <input id="fCovStartTime" type="time" value="${cov.startTime || ''}">
        </div>
        <div class="form-field" id="fCovEndTimeField" style="display:${cov.type === 'zeitraum' ? 'flex' : 'none'}">
          <label>Bis (Uhrzeit)</label>
          <input id="fCovEndTime" type="time" value="${cov.endTime || ''}">
        </div>
        <div class="form-field full"><label>Notizen (z.B. Telefonnummer)</label><input id="fCovNotes" value="${esc(cov.notes || '')}"></div>
      </div>
      <div class="form-actions">
        <button class="btn-save" onclick="Admin.saveCoverage()">Speichern</button>
        <button class="btn-cancel" onclick="Admin.hideForm('coverageForm')">Abbrechen</button>
      </div>
    `;
    form.scrollIntoView({ behavior: 'smooth' });
  },

  toggleCoverageFields() {
    const type = document.getElementById('fCovType').value;
    document.getElementById('fCovHalfDayField').style.display = type === 'halbtags' ? 'flex' : 'none';
    document.getElementById('fCovStartTimeField').style.display = type === 'zeitraum' ? 'flex' : 'none';
    document.getElementById('fCovEndTimeField').style.display = type === 'zeitraum' ? 'flex' : 'none';
  },

  async saveCoverage() {
    const type = document.getElementById('fCovType').value;
    const body = {
      colleagueName: document.getElementById('fCovName').value,
      practiceName: document.getElementById('fCovPraxis').value,
      date: document.getElementById('fCovDate').value,
      endDate: document.getElementById('fCovEndDate').value || '',
      type: type,
      halfDay: type === 'halbtags' ? document.getElementById('fCovHalfDay').value : '',
      startTime: type === 'zeitraum' ? document.getElementById('fCovStartTime').value : '',
      endTime: type === 'zeitraum' ? document.getElementById('fCovEndTime').value : '',
      notes: document.getElementById('fCovNotes').value
    };
    if (!body.colleagueName || !body.date) return alert('Name und Datum sind Pflichtfelder.');
    if (type === 'zeitraum' && (!body.startTime || !body.endTime)) return alert('Bitte Start- und Endzeit angeben.');
    if (Admin.editingId) {
      await Admin.api(`/api/coverage/${Admin.editingId}`, 'PUT', body);
    } else {
      await Admin.api('/api/coverage', 'POST', body);
    }
    Admin.hideForm('coverageForm');
    Admin.loadCoverage();
  },

  async deleteCoverage(id) {
    if (!confirm('Vertretung wirklich loeschen?')) return;
    await Admin.api(`/api/coverage/${id}`, 'DELETE');
    Admin.loadCoverage();
  },

  // ============================
  // SETTINGS
  // ============================
  async loadSettings() {
    const data = await Admin.api('/api/settings');
    document.getElementById('settPraxisName').value = data.praxisName || '';
    document.getElementById('settPraxisSubtitle').value = data.praxisSubtitle || '';
    document.getElementById('settKanbanEnabled').checked = data.kanbanEnabled !== false;
  },

  async saveSettings(e) {
    e.preventDefault();
    await Admin.api('/api/settings', 'PUT', {
      praxisName: document.getElementById('settPraxisName').value,
      praxisSubtitle: document.getElementById('settPraxisSubtitle').value,
      kanbanEnabled: document.getElementById('settKanbanEnabled').checked
    });
    alert('Einstellungen gespeichert!');
  },

  async changePassword(e) {
    e.preventDefault();
    const errEl = document.getElementById('pwError');
    const succEl = document.getElementById('pwSuccess');
    errEl.textContent = '';
    succEl.textContent = '';

    const newPw = document.getElementById('pwNew').value;
    const confirm = document.getElementById('pwConfirm').value;

    if (newPw !== confirm) {
      errEl.textContent = 'Passwoerter stimmen nicht ueberein.';
      return;
    }

    try {
      await Admin.api('/api/auth/change-password', 'POST', {
        currentPassword: document.getElementById('pwCurrent').value,
        newPassword: newPw
      });
      succEl.textContent = 'Passwort erfolgreich geaendert!';
      document.getElementById('pwCurrent').value = '';
      document.getElementById('pwNew').value = '';
      document.getElementById('pwConfirm').value = '';
    } catch (err) {
      errEl.textContent = err.message;
    }
  },

  // ============================
  // UTILS
  // ============================
  hideForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = 'none';
    form.innerHTML = '';
    Admin.editingId = null;
  }
};

// --- Escape HTML ---
function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Tab switching ---
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// --- Event listeners ---
document.getElementById('loginForm').addEventListener('submit', Admin.login);
document.getElementById('logoutBtn').addEventListener('click', Admin.logout);
document.getElementById('settingsForm').addEventListener('submit', Admin.saveSettings);
document.getElementById('passwordForm').addEventListener('submit', Admin.changePassword);

// --- Init ---
Admin.checkAuth();
