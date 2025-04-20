const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database/notes.json');

function loadNotesDB() {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify({ groupNotes: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveNotesDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { loadNotesDB, saveNotesDB };
