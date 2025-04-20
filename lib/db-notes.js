const fs = require('fs')
const path = require('path')
const notesDBPath = path.join(__dirname, '../database/notes.json')

function loadNotesDB() {
  if (!fs.existsSync(notesDBPath)) {
    // buat folder & file jika belum ada
    fs.mkdirSync(path.dirname(notesDBPath), { recursive: true })
    fs.writeFileSync(notesDBPath, JSON.stringify({ groupNotes: {} }, null, 2))
  }
  return JSON.parse(fs.readFileSync(notesDBPath))
}

function saveNotesDB(data) {
  fs.writeFileSync(notesDBPath, JSON.stringify(data, null, 2))
}

module.exports = { loadNotesDB, saveNotesDB }
