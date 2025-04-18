const { default: makeWaSocket, useMultiFileAuthState, downloadContentFromMessage, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
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
const { loadDB, saveDB } = require('./lib/db-remind')

const { PDFDocument } = require('pdf-lib')
// const Jimp = require('jimp')
const cv = require('opencv4nodejs-prebuilt-install');

global.userSessions = global.userSessions || {};


async function createScannedPDF(images, outputPath) {
    const pdfDoc = await PDFDocument.create();

    for (let imgPath of images) {
        try {
            // Baca gambar
            let mat = cv.imread(imgPath);

            // Ubah ke grayscale
            let gray = mat.bgrToGray();

            // Blur untuk mengurangi noise
            let blurred = gray.gaussianBlur(new cv.Size(5, 5), 1.5);

            // Adaptive Threshold (putih-hitam)
            let thresholded = blurred.adaptiveThreshold(
                255,
                cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                cv.THRESH_BINARY,
                21,   // blockSize: harus ganjil dan > 1
                10    // C: nilai penyesuaian threshold
            );

            // Tingkatkan resolusi gambar untuk kualitas lebih tinggi
            const tempPath = path.join(__dirname, `temp_${Date.now()}.png`);
            cv.imwrite(tempPath, thresholded);

            // Baca gambar dan embed ke PDF
            const imageBuffer = fs.readFileSync(tempPath);
            const pdfImage = await pdfDoc.embedPng(imageBuffer);

            // Menentukan ukuran halaman sesuai dengan gambar (HD)
            const width = pdfImage.width;
            const height = pdfImage.height;

            // Tambahkan halaman dengan ukuran yang tepat
            const page = pdfDoc.addPage([width, height]);
            page.drawImage(pdfImage, {
                x: 0,
                y: 0,
                width: width,
                height: height
            });

            // Hapus file sementara
            fs.unlinkSync(tempPath);
        } catch (error) {
            console.error(`Gagal memproses ${imgPath}:`, error);
        }
    }

    // Simpan PDF ke outputPath
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`✅ PDF selesai dibuat di ${outputPath}`);
}



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
            

// Tangkap dan simpan gambar jika user dalam sesi 'buatpdf'
// Ketika menerima gambar
        if (
            m.mtype === 'imageMessage' &&
            (m.mtype === 'imageMessage' || m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) &&
            userSessions[m.sender] &&
            userSessions[m.sender].collecting
        ) {
            console.log("Menerima gambar...");
            try {
                if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');
        
                const stream = await downloadContentFromMessage(m.message.imageMessage, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
        
                const filename = `./temp/${m.sender}_${Date.now()}.jpg`;
                fs.writeFileSync(filename, buffer);
        
                console.log(`Gambar disimpan di ${filename}`);
                userSessions[m.sender].images.push(filename);
        
                // Tambahkan flag untuk menunggu pengiriman batch selesai
                if (!userSessions[m.sender].pendingReply) {
                    userSessions[m.sender].pendingReply = true;
        
                    // Delay beberapa saat untuk memastikan semua gambar dalam batch sudah diproses
                    setTimeout(() => {
                        const total = userSessions[m.sender].images.length;
                        replygcxeon(`✅ Gambar diterima. Total gambar: ${total}\n\nKetik *selesai* untuk memprosses`);
                        userSessions[m.sender].pendingReply = false;
                    }, 1000); // Bisa diatur sesuai kebutuhan
                }
        
            } catch (e) {
                console.error(e);
                replygcxeon('❌ Gagal menyimpan gambar. Coba lagi.');
            }
        }
        
        // Jika user mengetik "selesai"
        const cyn = body.toLowerCase().trim();
        if (
            ['selesai', 'done'].includes(cyn) &&
            userSessions[m.sender]?.collecting
        ) {
            if (userSessions[m.sender].images.length === 0) {
                return replygcxeon('⚠️ Belum ada gambar yang dikirim.');
            }
        
            userSessions[m.sender].collecting = false;
            userSessions[m.sender].awaitingFileName = true;
            return replygcxeon('📝 Masukkan nama file PDF yang diinginkan (tanpa spasi, tanpa .pdf)');
        }                

        
        // Setelah itu user akan mengirim nama file
        if (userSessions[m.sender]?.awaitingFileName) {
            const fileNameRaw = body.trim().replace(/[^a-zA-Z0-9_-]/g, '');
            if (!fileNameRaw) return replygcxeon('⚠️ Nama file tidak valid. Coba lagi.');
        
            const fileName = `${fileNameRaw}.pdf`;
            const outputPdf = `./temp/${fileName}`;
            replygcxeon(`📄 Membuat file PDF: *${fileName}*, mohon tunggu...`);
        
            await createScannedPDF(userSessions[m.sender].images, outputPdf);
        
            const buffer = fs.readFileSync(outputPdf);
            await XeonBotInc.sendMessage(m.chat, {
                document: buffer,
                mimetype: 'application/pdf',
                fileName: fileName
            }, { quoted: m });
        
            // Hapus file sementara
            for (let file of userSessions[m.sender].images) fs.unlinkSync(file);
            fs.unlinkSync(outputPdf);
            delete userSessions[m.sender];
        
        }
// Auto-reply jika ditag di grup dengan teks
        
        

        switch (command) {
            case 'help':    
            case 'menu': {
                const menu = `
*🚀 Daftar Perintah Ti Unusia Bot:*

*📤 Pengelolaan Grup:*
*⚡ kick* - Mengeluarkan anggota dari grup
*🗣️ tagall* - Menandai semua anggota grup
*👤 addmember* - Menambahkan anggota ke grup
*🔒 promote* - Meningkatkan status anggota menjadi admin
*⬇️ demote* - Menurunkan status admin anggota
*📛 setname* - Mengubah nama grup
*📝 setdesc* - Mengubah deskripsi grup
*📸 setppgroup* - Mengubah foto profil grup
*🔒 modegrup* - Mengubah pengaturan grup (open/close)
*🔗 linkgrup* - Mendapatkan link undangan grup
*📥 hidetag* - Mengirim pesan dengan menyembunyikan siapa saja yang ditandai

*📚 Konversi Media:*
*📷 toimage* - Mengonversi stiker menjadi gambar
*📹 tovideo* - Mengonversi stiker menjadi video
*🎵 toaudio* - Mengonversi video atau audio menjadi audio
*📂 tomp3* - Mengonversi video atau audio menjadi MP3
*📞 tovn* - Mengonversi audio atau video menjadi voice note (VN)
*🎞️ togif* - Mengonversi stiker menjadi GIF
*🖼️ tikel* - Mengonversi image/video menjadi stiker
*🔗 tourl* - Mengonversi media menjadi URL (image/video)

*📝 Pembuat Konten:*
*📄 buatpdf* - Mengumpulkan gambar untuk membuat PDF
*🎨 stickerwm* - Menambahkan watermark pada stiker
*🖼️ tikel* - Mengonversi gambar/video menjadi stiker

_Powered by Ti Unusia Bot._       
                `;
                XeonBotInc.sendMessage(m.chat, {
                    text: menu
                }, {
                    quoted: m
                });
            }
            break
            case 'remindersolat':
              if (!m.isGroup) return replygcxeon('Fitur ini hanya bisa digunakan di grup!');
              if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon('Hanya admin yang bisa mengatur fitur ini!');

              const db = loadDB();
              const groupId = m.chat;

              if (args[0] === 'on') {
                if (!db.reminderGroups.includes(groupId)) {
                  db.reminderGroups.push(groupId);
                  saveDB(db);
                  replygcxeon('✅ Reminder Sholat berhasil *diaktifkan* untuk grup ini.');
                } else {
                  replygcxeon('Reminder Sholat sudah aktif di grup ini.');
                }
              } else if (args[0] === 'off') {
                if (db.reminderGroups.includes(groupId)) {
                  db.reminderGroups = db.reminderGroups.filter(id => id !== groupId);
                  saveDB(db);
                  replygcxeon('❌ Reminder Sholat berhasil *dinonaktifkan* untuk grup ini.');
                } else {
              replygcxeon('Reminder Sholat belum aktif di grup ini.');
              } 
              } else {
              replygcxeon('Penggunaan: *.remindersolat on* atau *.remindersolat off*');
            }
            break;                            
            case 'addmember':
                if (!m.isGroup) return replygcxeon(mess.group);
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin);
                if (!isBotAdmins) return replygcxeon(mess.botAdmin);
                
                let addMember = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                
                if (!addMember || addMember === '@s.whatsapp.net') {
                    return replygcxeon("Penggunaan: *addmember* nomor\nContoh: *addmember* 6289612345678");
                }
            
                await XeonBotInc.groupParticipantsUpdate(m.chat, [addMember], 'add')
                    .then((res) => {
                        replygcxeon(`✅ Berhasil, ${addMember} berhasil ditambahkan ke grup.`);
                    })
                    .catch((err) => replygcxeon(json(err)));
                break;
            
            case 'promote':
                if (!m.isGroup) return replygcxeon(mess.group);
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin);
                if (!isBotAdmins) return replygcxeon(mess.botAdmin);
                
                let promoteMember = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                
                if (!promoteMember || promoteMember === '@s.whatsapp.net') {
                    return replygcxeon("Penggunaan: *promote* balas ke user/nomor/tag user.");
                }
            
                await XeonBotInc.groupParticipantsUpdate(m.chat, [promoteMember], 'promote')
                    .then((res) => {
                        replygcxeon(`✅ Berhasil, ${promoteMember} berhasil dijadikan admin.`);
                    })
                    .catch((err) => replygcxeon(json(err)));
                break;
            
            case 'demote':
                if (!m.isGroup) return replygcxeon(mess.group);
                if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin);
                if (!isBotAdmins) return replygcxeon(mess.botAdmin);
                
                let demoteMember = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                
                if (!demoteMember || demoteMember === '@s.whatsapp.net') {
                    return replygcxeon("Penggunaan: *demote* balas ke user/nomor/tag user.");
                }
            
                await XeonBotInc.groupParticipantsUpdate(m.chat, [demoteMember], 'demote')
                    .then((res) => {
                        replygcxeon(`✅ Berhasil, ${demoteMember} berhasil diturunkan admin.`);
                    })
                    .catch((err) => replygcxeon(json(err)));
                break;

                case 'setname':
                case 'setsubject':
                    if (!m.isGroup) return replygcxeon(mess.group)
                    if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                    if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                    if (!text) return replygcxeon('Penggunaan: *setname* nama grup.')
                    await XeonBotInc.groupUpdateSubject(m.chat, text)
                        .then((res) => replygcxeon(`✅ Berhasil, nama grup telah diubah menjadi: ${text}`))
                        .catch((err) => replygcxeon(json(err)))
                    break
                
                case 'setdesc':
                case 'setdesk':
                    if (!m.isGroup) return replygcxeon(mess.group)
                    if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                    if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                    if (!text) return replygcxeon('Penggunaan: *setdesc* deskripsi grup.')
                    await XeonBotInc.groupUpdateDescription(m.chat, text)
                        .then((res) => replygcxeon(`✅ Berhasil, deskripsi grup telah diubah menjadi: ${text}`))
                        .catch((err) => replygcxeon(json(err)))
                    break
                
                case 'setppgroup':
                case 'setppgrup':
                case 'setppgc':
                    if (!m.isGroup) return replygcxeon(mess.group)
                    if (!isAdmins) return replygcxeon(mess.admin)
                    if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                    if (!quoted) return replygcxeon(`Tolong kirim/reply gambar dengan caption ${prefix + command}`)
                    if (!/image/.test(mime)) return replygcxeon(`Tolong kirim/reply gambar dengan caption ${prefix + command}`)
                    if (/webp/.test(mime)) return replygcxeon(`Tolong kirim/reply gambar dengan caption ${prefix + command}`)
                    var medis = await XeonBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                    if (args[0] == 'full') {
                        var { img } = await generateProfilePicture(medis)
                        await XeonBotInc.query({
                            tag: 'iq',
                            attrs: {
                                to: m.chat,
                                type: 'set',
                                xmlns: 'w:profile:picture'
                            },
                            content: [{
                                tag: 'picture',
                                attrs: { type: 'image' },
                                content: img
                            }]
                        })
                        fs.unlinkSync(medis)
                        replygcxeon('✅ Berhasil, foto profil grup telah diubah.')
                    } else {
                        var memeg = await XeonBotInc.updateProfilePicture(m.chat, { url: medis })
                        fs.unlinkSync(medis)
                        replygcxeon('✅ Berhasil, foto profil grup telah diubah.')
                    }
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
                
                case 'modegrup':
                    if (!m.isGroup) return replygcxeon(mess.group)
                    if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                    if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                    if (args[0] === 'close') {
                        await XeonBotInc.groupSettingUpdate(m.chat, 'announcement')
                            .then((res) => replygcxeon(`✅ Berhasil menutup grup. Hanya admin yang bisa mengirim pesan.`))
                            .catch((err) => replygcxeon(json(err)))
                    } else if (args[0] === 'open') {
                        await XeonBotInc.groupSettingUpdate(m.chat, 'not_announcement')
                            .then((res) => replygcxeon(`Berhasil membuka grup. Semua orang bisa mengirim pesan.`))
                            .catch((err) => replygcxeon(json(err)))
                    } else {
                        replygcxeon(`Penggunaan: *modegrup* open/close.`)
                    }
                    break
            
                
                case 'linkgroup':
                case 'grouplink':
                case 'linkgrup':
                case 'linkgc':
                    if (!m.isGroup) return replygcxeon(mess.group)
                    if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                    if (!isBotAdmins) return replygcxeon(mess.botAdmin)
                    let response = await XeonBotInc.groupInviteCode(m.chat)
                    XeonBotInc.sendText(m.chat, `👥 *GROUP LINK INFO*\n📛 *Name :* ${groupMetadata.subject}\n👤 *Group Owner :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Not known'}\n🌱 *ID :* ${groupMetadata.id}\n🔗 *Chat Link :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${groupMetadata.participants.length}\n`, m, {
                        detectLink: true
                    })
                    break
                
                case 'kick':
                    if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
                    if (!isBotAdmins) return replygcxeon(mess.botAdmin)                        
                    if (!m.isGroup) return replygcxeon(mess.group)
                    let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                    if (!blockwww || blockwww === text.replace(/[^0-9]/g, '') + '@s.whatsapp.net') {
                        return replygcxeon("Penggunaan: *kick* balas ke user/nomor/tag user.")
                    }
                    await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwww], 'remove')
                        .then((res) => replygcxeon(`✅ Berhasil, ${blockwww} telah dikeluarkan dari grup.`))
                        .catch((err) => replygcxeon(json(err)))
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
                if (m.isGroup) {
                    // Jika pesan berasal dari grup, beri tahu pengguna untuk menggunakan fitur ini di chat pribadi
                    return replygcxeon('Fitur ini hanya dapat digunakan di chat pribadi.');
                } else {
                    // Memeriksa apakah pengguna sudah memiliki sesi pengumpulan gambar
                    if (!userSessions[m.sender]) {
                        // Jika belum ada sesi, buat sesi baru dan beri instruksi
                        userSessions[m.sender] = {
                            images: [],  // Array untuk menampung gambar
                            collecting: true  // Menandakan bahwa sesi pengumpulan gambar dimulai
                        };
            
                        // Mengirim pesan instruksi kepada pengguna
                        replygcxeon('Kirimkan gambar yang ingin kamu jadikan PDF. Jika sudah selesai, ketik *selesai* untuk memproses.\n\nNote: _Kirim gambar dengan kualitas HD untuk hasil yang bagus._');
                    } else {
                        // Jika pengguna sudah dalam sesi, beri tahu mereka untuk mengirim "selesai"
                        replygcxeon('Kamu masih dalam sesi. Kirim *selesai* jika sudah mengirim semua gambar.');
                    }
                }
            }
            break;
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return replygcxeon(`Penggunaan: *toimage* balas ke pesan gambar.`)
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
                if (!/webp/.test(mime)) return replygcxeon(`Penggunaan: *tovideo* balas ke pesan gambar.`)
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
                if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxeon(`Penggunaan: *toaudio* balas ke pesan video.`)
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
                if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxeon(`Penggunaan: *tomp3* balas ke pesan video`)
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
                if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxeon(`Penggunaan: *tovn* balas ke pesan audio/video.`)
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
                if (!qmsg) {
                    return replygcxeon('Penggunaan: *togif* balas kepesan stiker animasi/video');
                }
                if (/webp/.test(mime)) {
                    replygcxeon(mess.wait)
                    let media = await XeonBotInc.downloadAndSaveMediaMessage(qmsg)
                    // Mengonversi WebP menjadi GIF
                    let webpToGif = await webp2gifFile(media)
                    await XeonBotInc.sendMessage(m.chat, {
                        video: {
                            url: webpToGif.result,
                            caption: 'Converted WebP to GIF'
                        },
                        gifPlayback: true
                    }, {
                        quoted: m
                    })
                    await fs.unlinkSync(media)
                }
                // Jika media adalah video
                else if (/video/.test(mime)) {
                    replygcxeon(mess.wait)
                    let media = await XeonBotInc.downloadAndSaveMediaMessage(qmsg)
                    // Mengonversi video menjadi GIF
                    let videoToGif = await video2gifFile(media)
                    await XeonBotInc.sendMessage(m.chat, {
                        video: {
                            url: videoToGif.result,
                            caption: 'Converted Video to GIF'
                        },
                        gifPlayback: true
                    }, {
                        quoted: m
                    })
                    await fs.unlinkSync(media)
                }
                else {
                    replygcxeon('Media yang kamu kirim bukan gambar WebP atau video.')
                }
            }
            break
            case 'tourl': {
                if (!qmsg) {
                    return replygcxeon('Penggunaan: *tourl* balas kepesan gambar');
                }                
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
            case 's': {
                if (!quoted) return replygcxeon(`Penggunaan: *tikel* balas kepesan gambar/video`)
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
                    return replygcxeon(`Penggunaan: *tikel* balas kepesan gambar/video`)
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
