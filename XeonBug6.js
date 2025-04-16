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

const { PDFDocument } = require('pdf-lib')
const Jimp = require('jimp')

async function createScannedPDF(images, outputPath) {
    const pdfDoc = await PDFDocument.create();

    for (let imgPath of images) {
        let image = await Jimp.read(imgPath);

        // Proses gambar seperti di CamScanner
        image
            .greyscale()       // Mengubah gambar menjadi grayscale
            .contrast(1)       // Menambah kontras
            .brightness(0.1)   // Menambah sedikit kecerahan
            .normalize()       // Normalisasi gambar
            .quality(80);      // Mengurangi kualitas gambar untuk kompresi

        let processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        const pdfImage = await pdfDoc.embedJpg(processedBuffer);

        // Menambahkan halaman dengan ukuran gambar
        const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
        page.drawImage(pdfImage, {
            x: 0,
            y: 0,
            width: pdfImage.width,
            height: pdfImage.height
        });
    }

    // Menyimpan file PDF
    const pdfBytes = await pdfDoc.save();
    console.log('PDF selesai dibuat, menyimpan ke ' + outputPath); // Tambahkan log
    fs.writeFileSync(outputPath, pdfBytes);
}



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

        const userSessions = {}

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
            
        
// Tangkap dan simpan gambar jika user dalam sesi 'buatpdf'
        if (userSessions[m.sender]?.collecting && m.mimetype?.includes('image')) {
            console.log("Menerima gambar...");  // Menambahkan log

            try {
                if (!fs.existsSync('./temp')) fs.mkdirSync('./temp'); // Pastikan folder temp ada
        
                let media = await XeonBotInc.downloadMediaMessage(m); // Mendownload media
                let filename = `./temp/${m.sender}_${Date.now()}.jpg`; // Menyimpan dengan nama unik
                fs.writeFileSync(filename, media); // Menyimpan file gambar ke folder temp
        
                console.log(`Gambar disimpan di ${filename}`); // Tambahkan log ini untuk mengecek
        
                userSessions[m.sender].images.push(filename); // Menambahkan gambar ke sesi pengumpulan
                replygcxeon(`✅ Gambar diterima. Total gambar: ${userSessions[m.sender].images.length}`);
            } catch (e) {
                console.log(e);
                replygcxeon('❌ Gagal menyimpan gambar. Coba lagi.');
            }
        }

        
        // Proses PDF saat user mengetik 'selesai'
        if (body.toLowerCase() === 'selesai' && userSessions[m.sender]?.collecting) {
            console.log('Perintah selesai diterima'); // Tambahkan log ini untuk memeriksa
        
            if (userSessions[m.sender].images.length === 0) {
                return replygcxeon('⚠️ Belum ada gambar yang dikirim.');
            }
        
            userSessions[m.sender].collecting = false; // Menandakan pengumpulan gambar selesai
            replygcxeon('📄 Sedang membuat file PDF, mohon tunggu...');
        
            const outputPdf = `./temp/${m.sender}_hasil.pdf`; // Menentukan path output PDF
            await createScannedPDF(userSessions[m.sender].images, outputPdf); // Membuat PDF
        
            const buffer = fs.readFileSync(outputPdf); // Membaca file PDF
            XeonBotInc.sendMessage(m.chat, {
                document: buffer,
                mimetype: 'application/pdf',
                fileName: 'Scan_Hasil.pdf'
            }, { quoted: m });
        
            // Menghapus file sementara setelah dikirim
            for (let file of userSessions[m.sender].images) fs.unlinkSync(file);
            fs.unlinkSync(outputPdf); // Menghapus file PDF yang sudah dibuat
            delete userSessions[m.sender]; // Menghapus sesi pengumpulan gambar
        }


        switch (command) {
            case 'kick':
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                if (!isBotAdmins) return replygcxeon(mess.botAdmin)                        
                if (!m.isGroup) return replygcxeon(mess.group)
                let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwww], 'remove').then((res) => replygcxeon(json(res))).catch((err) => replygcxeon(json(err)))
                break
            case 'all':                        
            case 'tagall':
                if (!m.isGroup) return replygcxeon(mess.group)
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
            case 'buatpdf': {
                console.log("cmd buatpdf...");  // Menambahkan log
            
                // Memastikan perintah hanya dijalankan jika bukan pesan di grup
                if (!m.isGroup) {
                    // Memeriksa apakah pengguna sudah memiliki sesi pengumpulan gambar
                    if (!userSessions[m.sender]) {
                        // Jika belum ada sesi, buat sesi baru dan beri instruksi
                        userSessions[m.sender] = {
                            images: [],  // Array untuk menampung gambar
                            collecting: true  // Menandakan bahwa sesi pengumpulan gambar dimulai
                        };
            
                        // Mengirim pesan instruksi kepada pengguna
                        replygcxeon('Kirimkan gambar yang ingin kamu jadikan PDF. Jika sudah selesai, ketik *selesai* untuk memproses.');
                    } else {
                        // Jika pengguna sudah dalam sesi, beri tahu mereka untuk mengirim "selesai"
                        replygcxeon('Kamu masih dalam sesi. Kirim *selesai* jika sudah mengirim semua gambar.');
                    }
                }
            }
            break;

                        
            case 'swm': case 'steal': case 'stickerwm': case 'take':{
                if (!args.join(" ")) return replygcxeon(`Where is the text?`)
                const swn = args.join(" ")
                const pcknm = swn.split("|")[0]
                const atnm = swn.split("|")[1]
                if (m.quoted.isAnimated === true) {
                XeonBotInc.downloadAndSaveMediaMessage(quoted, "gifee")
                XeonBotInc.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:m})
                } else if (/image/.test(mime)) {
                let media = await quoted.download()
                let encmedia = await XeonBotInc.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
                } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11) return replygcxeon('Maximum 10 Seconds!')
                let media = await quoted.download()
                let encmedia = await XeonBotInc.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
                } else {
                replygcxeon(`Photo/Video?`)
                }
                }
                break
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return replygcxeon(`Reply sticker with caption *${prefix + command}*`)
                replygcxeon(mess.wait)       
                let media = await XeonBotInc.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    XeonBotInc.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })

            }
            break
            case 'tomp4':
            case 'tovideo': {
                if (!/webp/.test(mime)) return replygcxeon(`Reply sticker with caption *${prefix + command}*`)
                replygcxeon(mess.wait)
                let media = await XeonBotInc.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await XeonBotInc.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    }
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break
            case 'toaud':
            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxeon(`Send/Reply Video/Audio that you want to make into audio with caption ${prefix + command}`)
                replygcxeon(mess.wait)
                let media = await XeonBotInc.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                XeonBotInc.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })

            }
            break
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxeon(`Send/Reply Video/Audio that you want to make into MP3 with caption ${prefix + command}`)
                replygcxeon(mess.wait)
                let media = await XeonBotInc.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                XeonBotInc.sendMessage(m.chat, {
                    document: audio,
                    mimetype: 'audio/mp3',
                    fileName: `ti.mp3`
                }, {
                    quoted: m
                })

            }
            break
            case 'tovn':
            case 'toptt': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxeon(`Reply Video/Audio that you want to make into a VN with caption ${prefix + command}`)
                replygcxeon(mess.wait)
                let media = await XeonBotInc.downloadMediaMessage(qmsg)
                let {
                    toPTT
                } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                XeonBotInc.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, {
                    quoted: m
                })

            }
            break
            case 'togif': {
                if (!/webp/.test(mime)) return replygcxeon(`Reply sticker with caption *${prefix + command}*`)
                replygcxeon(mess.wait)
                let media = await XeonBotInc.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await XeonBotInc.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    },
                    gifPlayback: true
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break
            case 'tourl': {
                replygcxeon(mess.wait)
                let media = await XeonBotInc.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    replygcxeon(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    replygcxeon(util.format(anu))
                }
                await fs.unlinkSync(media)

            }
            break                        
            case 'tikel':
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
