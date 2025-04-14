const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')

const scheduledTimes = [
  { time: '05:00', message: '🌄 Jangan lupa Sholat Subuh ya! Semoga harimu penuh berkah! ✨' },
  { time: '12:00', message: '🏙️ Sudah masuk waktu Dzuhur nih~ Yuk sholat dulu! 🕛' },
  { time: '15:00', message: '☀️ Ashar udah tiba, jangan ditunda sholatnya! ⏳' },
  { time: '18:33', message: '🌇 Maghrib telah datang~ Waktunya sholat! 🕌' },
  { time: '19:30', message: '🌌 Jangan lupa Sholat Isya sebelum istirahat ya! 😴' },
  { time: '20:19', message: 'eak' },  
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

    for (const { time, message } of scheduledTimes) {
      if (time === currentTime && !sentMessages.has(timeKey)) {
        sentMessages.add(timeKey)
        try {
          const groupId = '120363401547215935@g.us'
          const metadata = await XeonBotInc.groupMetadata(groupId)
          const participants = metadata.participants

          let mentions = []
          let mentionText = ''
          for (let mem of participants) {
            const id = mem.id
            mentions.push(id)
            mentionText += `@${id.split('@')[0]}\n`
          }

          // === Baca file lokal ===
          const media = fs.readFileSync(path.join(__dirname, 'bedug.png'))

          // === Kirim stiker ===
          await XeonBotInc.sendImageAsSticker(groupId, media, null, {
            packname: 'SholatBot',
            author: 'Pengingat Shalat'
          })

          // === Kirim teks ===
          const formattedMessage = `*📢 Pengingat Shalat*\n\n_${message}_\n\n*🧑‍🧑‍🧒‍🧒 Anggota Grup:*\n${mentionText.trim()}`
          await XeonBotInc.sendMessage(groupId, {
            text: formattedMessage,
            mentions
          })

          console.log(`Sent scheduled message at ${time}: ${message}`)
        } catch (err) {
          console.error(`Error sending scheduled message: ${err.message}`)
        }
      }
    }

    if (currentTime === '00:01') {
      sentMessages.clear()
      console.log('Reset sent messages for new day')
    }
  }, 1000)

  console.log('Scheduler is running...')
}
