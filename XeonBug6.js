const { default: makeWaSocket, useMultiFileAuthState, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const os = require('os')
const fs = require('fs') 
const fsx = require('fs-extra')
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const moment = require('moment-timezone')
const speed = require('performance-now')
const ms = toMs = require('ms')
const axios = require('axios')
const fetch = require('node-fetch')
const pino = require('pino')
const { exec, spawn, execSync } = require("child_process")
const { performance } = require('perf_hooks')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { toAudio, toPTT, toVideo, ffmpeg, addExifAvatar } = require('./lib/converter')
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, json, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
let afk = require("./lib/afk");
const { addPremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser } = require('./lib/premiun')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")

//bug databas

//database
let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
let _owner = JSON.parse(fs.readFileSync('./database/owner.json'))
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))

//autorep


//time
const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
        const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
        const time2 = moment().tz('Asia/Kolkata').format('HH:mm:ss')  

module.exports = XeonBotInc = async (XeonBotInc, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectreplygcxeon.selectedRowId : (m.mtype == 'templateButtonreplygcxeonMessage') ? m.message.templateButtonreplygcxeonMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectreplygcxeon.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi.test(body) ? body.match(/^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await XeonBotInc.decodeJid(XeonBotInc.user.id)
        const itsMe = m.sender == botNumber ? true : false
        const sender = m.sender
        const text = q = args.join(" ")
        const from = m.key.remoteJid
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isText = (type == 'textMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sticker = []
        const isGroup = m.key.remoteJid.endsWith('@g.us')
        const groupMetadata = m.isGroup ? await XeonBotInc.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const isCreator = [ownernumber, ..._owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPremium = isCreator || isCreator || checkPremiumUser(m.sender, premium);
        const clientId = XeonBotInc.user.id.split(':')[0];
        const senderbot = m.key.fromMe ? XeonBotInc.user.id.split(':')[0] + "@s.whatsapp.net" || XeonBotInc.user.id : m.key.participant || m.key.remoteJid;
        const senderId = senderbot.split('@')[0];
        const isBot = clientId.includes(senderId);
        expiredCheck(XeonBotInc, m, premium);
//group chat msg by xeon


const replygcxeon = (teks) => {
XeonBotInc.sendMessage(m.chat,
{ text: teks,
contextInfo:{
mentionedJid:[sender]}},
{ quoted: m})
}


    //chat counter (console log)
        if (m.message && m.isGroup) {
            console.log(chalk.cyan(`\n< ================================================== >\n`))
            console.log(chalk.green(`Group Chat:`))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> In'), chalk.green(groupName, m.chat))
        } else {
            console.log(chalk.cyan(`\n< ================================================== >\n`))
            console.log(chalk.green(`Private Chat:`))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender))
        }

    
        switch (command) {
            case 'addprem':
                if (!isCreator) return replygcxeon(mess.owner)
                if (args.length < 2)
                    return replygcxeon(`Use :\n*#addprem* @tag time\n*#addprem* number time\n\nExample : #addprem @tag 30d`);
                if (m.mentionedJid.length !== 0) {
                    for (let i = 0; i < m.mentionedJid.length; i++) {
                        addPremiumUser(m.mentionedJid[0], args[1], premium);
                    }
                    replygcxeon("Premium Success")
                } else {
                    addPremiumUser(args[0] + "@s.whatsapp.net", args[1], premium);
                    replygcxeon("Success")
                }
                break
            case 'delprem':
                if (!isCreator) return replygcxeon(mess.owner)
                if (args.length < 1) return replygcxeon(`Use :\n*#delprem* @tag\n*#delprem* number`);
                if (m.mentionedJid.length !== 0) {
                    for (let i = 0; i < m.mentionedJid.length; i++) {
                        premium.splice(getPremiumPosition(m.mentionedJid[i], premium), 1);
                        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
                    }
                    replygcxeon("Delete success")
                } else {
                    premium.splice(getPremiumPosition(args[0] + "@s.whatsapp.net", premium), 1);
                    fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
                    replygcxeon("Success")
                }
                break
            case 'listprem': {
                if (!isCreator) return replygcxeon(mess.owner)
                let data = require("./database/premium.json")
                let txt = `*------ã€Œ LIST PREMIUM ã€------*\n\n`
                for (let i of data) {
                    txt += `Number : ${i.id}\n`
                    txt += `Expired : ${i.expired} Second\n`         
                }                
                XeonBotInc.sendMessage(m.chat, {
                    text: txt,
                    mentions: i
                }, {
                    quoted: m
                })
            }
            break
            case 'kick':
                if (!m.isGroup) return replygcxeon(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwww], 'remove').then((res) => replygcxeon(json(res))).catch((err) => replygcxeon(json(err)))
                break
            case 'tagall':
                if (!m.isGroup) return replygcxeon(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                let teks = `*Tag All*
 
                *Message : ${q ? q : 'blank'}*\n\n`
                for (let mem of participants) {
                    teks += `@${mem.id.split('@')[0]}\n`
                }
                XeonBotInc.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'hidetag':
                if (!m.isGroup) return replygcxeon(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                XeonBotInc.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'totag':
                if (!m.isGroup) return replygcxeon(mess.group)
                if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                if (!isAdmins) return replygcxeon(mess.admin)
                if (!m.quoted) return replygcxeon(`Reply messages with captions ${prefix + command}`)
                XeonBotInc.sendMessage(m.chat, {
                    forward: m.quoted.fakeObj,
                    mentions: participants.map(a => a.id)
                })
                break
            case 'sticker':
            case 'stiker':
            case 's': {
                if (!quoted) return replygcxeon(`Reply to Video/Image With Caption ${prefix + command}`)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await XeonBotInc.sendImageAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (isVideo || /video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return replygcxeon('Maximum 10 seconds!')
                    let media = await quoted.download()
                    let encmedia = await XeonBotInc.sendVideoAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    return replygcxeon(`Send Images/Videos With Captions ${prefix + command}\nVideo Duration 1-9 Seconds`)
                }
            }
            break

            case 'ea':
            case 'eak': {
                if (/image/.test(mime)) {
                    anuan = await XeonBotInc.downloadAndSaveMediaMessage(quoted)
                    XeonBotInc.sendMessage(sender, {
                        image: {
                            url: anuan
                        },
                        fileLength: "999",
                        viewOnce: false
                    }, {
                        quoted: m
                    })
                } else if (/video/.test(mime)) {
                    anuanuan = await XeonBotInc.downloadAndSaveMediaMessage(quoted)
                    XeonBotInc.sendMessage(sender, {
                        video: {
                            url: anuanuan
                        },
                        fileLength: "99999999",
                        viewOnce: false
                    }, {
                        quoted: m
                    })
                }
            }
            break
 
        }
    } catch (err) {
        XeonBotInc.sendText(ownernumber + '@s.whatsapp.net', util.format(err), m)
        console.log(util.format(err))
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
