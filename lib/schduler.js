const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
const { loadDB, saveDB } = require('./db-remind')

const scheduledTimes = [
  { time: '04:36', message: '🌄 Jangan lupa Sholat Subuh ya! Semoga harimu penuh berkah! ✨' },
  { time: '06:00', message: '' }, // Tambahan pagi
  { time: '11:53', message: '🏙️ Sudah masuk waktu Dzuhur nih~ Yuk sholat dulu! 🕛' },
  { time: '15:12', message: '☀️ Ashar udah tiba, jangan ditunda sholatnya! ⏳' },
  { time: '17:52', message: '🌇 Maghrib telah datang~ Waktunya sholat! 🕌' },
  { time: '19:02', message: '🌌 Jangan lupa Sholat Isya sebelum istirahat ya! 😴' },
  { time: '22:00', message: '' },  
]

const morningMessages = [
  "Selamat pagi wahai penghuni grup!\nYang bangun siang, semoga rezekinya nggak ikutan kesiangan ya.\nYang masih ngantuk… kopi dulu, baru ngelucu!",
  "Pagi-pagi udah buka WA?\nKerja belum, mandi belum, tapi scroll grup mah jalan terus!\nSelamat pagi, semoga hidupmu nggak cuma aktif di grup aja!",
  "Selamat pagi buat yang masih jomblo,\nSemoga pagi ini bukan cuma roti bakar yang berpasangan, tapi juga hatimu…\nYa walaupun tetap ending-nya sarapan sendiri sih!",
  "Mentari pagi udah nongol,\nYang masih tidur itu kebangetan…\nBangun woy, jangan mimpi jadi sultan, kalo bangun aja masih ogah-ogahan!",
  "Pagi-pagi minum kopi,\nDitemani gorengan dua biji.\nSelamat pagi para netizen sejati,\nSemoga harimu tak seberisik notifikasi grup ini!"
]

const nightMessages = [
  "Selamat malam wahai para pejuang rebahan. Saatnya recharge tenaga… dengan mimpi jadi sultan!",
  "Tidurlah wahai manusia-manusia kuat… kuat nahan rasa kangen sama doi yang gak pernah nge-chat duluan.",
  "Selamat malam, semoga tidurmu nyenyak seperti hape yang baru dicas 100% lalu langsung ditinggal tidur.",
  "Waktunya tidur… biar besok bisa bangun dengan semangat baru. Atau setidaknya, bangun tanpa alarm dimatiin 7 kali dulu."
]

const sentMessages = new Set()


function getTimeKey(date, time) {
  return `${date}-${time}`
}

module.exports = (XeonBotInc) => {
  setInterval(async () => {
    const now = moment().tz('Asia/Jakarta')
    const currentTime = now.format('HH:mm')
    const currentDate = now.format('YYYY-MM-DD')
    const timeKey = getTimeKey(currentDate, currentTime)

    if (sentMessages.has(timeKey)) return

    const db = loadDB()
    const reminderGroups = db.reminderGroups || []

    for (const { time, message } of scheduledTimes) {
      if (time !== currentTime) continue
      sentMessages.add(timeKey)

      for (const groupId of reminderGroups) {
        try {
          const metadata = await XeonBotInc.groupMetadata(groupId)
          const participants = metadata.participants
          const mentions = participants.map(p => p.id)
          const mentionText = mentions.map(id => `@${id.split('@')[0]}`).join('\n')

          let finalMessage = message
          let title = '*📢 Pengingat Shalat*'

          if (time === '06:00') {
            finalMessage = morningMessages[Math.floor(Math.random() * morningMessages.length)]
            title = '*🌞 Selamat Pagi Grup!*'
          } else if (time === '22:00') {
            finalMessage = nightMessages[Math.floor(Math.random() * nightMessages.length)]
            title = '*📢 Pemberitahuan Malam*'
          } else {
            const media = fs.readFileSync(path.join(__dirname, 'bedug.png'))
            await XeonBotInc.sendImageAsSticker(groupId, media, null, {
              packname: 'SholatBot',
              author: 'Pengingat Shalat'
            })
          }

          const formattedMessage = `${title}\n\n_${finalMessage}_\n\n*🧑‍🧑‍🧒‍🧒 Anggota Grup:*\n${mentionText}`
          await XeonBotInc.sendMessage(groupId, {
            text: formattedMessage,
            mentions
          })

          console.log(`[Reminder] Sent to ${groupId} at ${time}`)
        } catch (err) {
          console.error(`[Reminder Error] ${groupId}: ${err.message}`)
        }
      }
    }

    if (currentTime === '00:01') {
      sentMessages.clear()
      console.log('Reset sent messages for new day')
    }
  }, 1000)

  console.log('⏰ Reminder scheduler running...')
}
