const moment = require('moment-timezone')

const scheduledTimes = [
  { time: '05:00', message: 'Good Morning, this is your 5 AM reminder!' },
  { time: '12:00', message: 'Good Afternoon, this is your 12 PM reminder!' },
  { time: '15:00', message: 'Good Afternoon, this is your 3 PM reminder!' },
  { time: '18:18', message: 'Eaaaa Eaaaa Eaaaa' },
  { time: '23:03', message: 'Good Evening, this is your 11:03 PM reminder!' },
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
          await XeonBotInc.sendMessage('120363401547215935@g.us', {
            text: message,
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
