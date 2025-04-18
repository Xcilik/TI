const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '../database/remindSolat.json')

function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true })
    fs.writeFileSync(dbPath, JSON.stringify({ reminderGroups: [] }, null, 2))
  }
  return JSON.parse(fs.readFileSync(dbPath))
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

module.exports = { loadDB, saveDB }
