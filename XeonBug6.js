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
const { createCanvas, loadImage } = require('canvas')
const YTDlpWrap = require('yt-dlp-wrap').default;
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
// di file utama bot kamu
const { loadNotesDB, saveNotesDB } = require('./lib/db-notes')

const { PDFDocument } = require('pdf-lib')
// const Jimp = require('jimp')
const cv = require('opencv4nodejs-prebuilt-install');

const daftarAbsen = {};
const daftarAcara = {};

// Format: { chatId: { messageId, title, peserta: [{ id, name }] } }
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

        if (budy.toLowerCase().startsWith('hadir')) {
            if (!isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup.');
            if (!daftarAbsen[m.chat]) return; // Tidak ada absen aktif
        
            const nama = budy.slice(6).trim(); // Mengambil teks setelah ".hadir"
            if (!nama) return m.reply('Ketik: *hadir Nama Lengkap*');
        
            const list = daftarAbsen[m.chat];
        
            if (list.peserta.some(p => p.id === m.sender)) {
                return m.reply('Kamu sudah absen sebelumnya.');
            }
        
            list.peserta.push({ id: m.sender, nama });
        
            const updatedText = `*📋 Absensi: ${list.title}*\n\nKetik *.hadir {nama lengkap}* untuk mengisi absen.\n\n*Daftar Hadir:*\n` +
                list.peserta.map((p, i) => `${i + 1}. ${p.nama}`).join('\n');
        
            await XeonBotInc.sendMessage(m.chat, {
                text: updatedText,
                edit: list.key
            });
        
            m.reply('Terima kasih, absen kamu sudah dicatat.');
        }
        
        if (budy.toLowerCase().startsWith('nothadir')) {
            if (!isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup.');
            if (!daftarAbsen[m.chat]) return;
        
            const groupMetadata = await XeonBotInc.groupMetadata(m.chat);
            const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && (p.admin === 'admin' || p.admin === 'superadmin'));
            if (!isAdmin) return m.reply('Hanya admin yang bisa menghapus peserta absen.');
        
            const nomor = parseInt(budy.slice(10).trim());
            if (isNaN(nomor) || nomor < 1) return m.reply('Ketik: *.notabsen {nomor urutan}*');
        
            const list = daftarAbsen[m.chat];
            if (nomor > list.peserta.length) return m.reply('Nomor urutan tidak ditemukan.');
        
            const removed = list.peserta.splice(nomor - 1, 1)[0];
        
            const updatedText = `*📋 Absensi: ${list.title}*\n\nKetik *.hadir {nama lengkap}* untuk mengisi absen.\n\n*Daftar Hadir:*\n` +
                (list.peserta.length > 0
                    ? list.peserta.map((p, i) => `${i + 1}. ${p.nama}`).join('\n')
                    : '_Belum ada yang hadir._');
        
            await XeonBotInc.sendMessage(m.chat, {
                text: updatedText,
                edit: list.key
            });
        
            m.reply(`Peserta nomor ${nomor} (${removed.nama}) telah dihapus dari absen.`);
        }
        if (budy.toLowerCase().startsWith('.doneabsen')) {
            if (!isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup.');
            if (!daftarAbsen[m.chat]) return m.reply('Tidak ada absen yang aktif.');
        
            const groupMetadata = await XeonBotInc.groupMetadata(m.chat);
            const isAdmin = groupMetadata.participants.some(p => p.id === m.sender && (p.admin === 'admin' || p.admin === 'superadmin'));
            if (!isAdmin) return m.reply('Hanya admin yang bisa mengakhiri absen.');
        
            const list = daftarAbsen[m.chat];
        
            // Kirim rekap absen sebelum dihapus
            const recapText = `✅ *Absen Selesai: ${list.title}*\n\n*Total Hadir:* ${list.peserta.length}\n\n*Daftar Hadir:*\n` +
                (list.peserta.length > 0
                    ? list.peserta.map((p, i) => `${i + 1}. ${p.nama}`).join('\n')
                    : '_Tidak ada yang hadir._');
        
            await XeonBotInc.sendMessage(m.chat, { text: recapText });
        
            delete daftarAbsen[m.chat];
            m.reply('Absen ditutup. Terima kasih!');
        }
        
        if (budy.toLowerCase().trim() === 'ikut') {
            if (!daftarAcara[m.chat]) return; // Tidak ada acara aktif
        
            const group = daftarAcara[m.chat];
            const user = m.sender;
        
            if (group.peserta.find(p => p.id === user)) {
                return m.reply('Kamu sudah terdaftar di acara ini!');
            }
        
            const name = await XeonBotInc.getName(user);
            group.peserta.push({ id: user, name });
        
            // Reply "ya kamu ikut" ke yang ngetik
            await m.reply('Ya kamu ikut');
        
            // Update daftar peserta
            let text = `*📌 Nama Acara: ${group.title}*\n\n*Total Peserta:* ${group.peserta.length}\n\nKetik *ikut* untuk jika mau ikut!\n\n*Peserta:*`;
            group.peserta.forEach((p, i) => {
                text += `\n${i + 1}. @${p.id.split('@')[0]}`;
            });
        
            try {
                await XeonBotInc.sendMessage(m.chat, {
                    text,
                    mentions: group.peserta.map(p => p.id),
                    edit: group.key
                });
            } catch (e) {
                console.log('Gagal edit:', e);
                m.reply('Gagal update daftar, coba lagi nanti.');
            }
        }

        
        if (budy.toLowerCase().trim() === 'gakjadi') {
            if (!daftarAcara[m.chat]) return;
        
            const group = daftarAcara[m.chat];
            const user = m.sender;
        
            const index = group.peserta.findIndex(p => p.id === user);
            if (index === -1) {
                return m.reply('Kamu belum terdaftar di acara ini!');
            }
        
            group.peserta.splice(index, 1); // Hapus dari daftar
        
            let text = `*📌 Nama Acara: ${group.title}*\n\n*Total Peserta:* ${group.peserta.length}\n\nKetik *ikut* jika ingin ikut!\n\n*Peserta:*`;
            group.peserta.forEach((p, i) => {
                text += `\n${i + 1}. @${p.id.split('@')[0]}`;
            });
        
            try {
                await XeonBotInc.sendMessage(m.chat, {
                    text,
                    mentions: group.peserta.map(p => p.id),
                    edit: group.key
                });
                m.reply('Oke, kamu gak jadi ikut.');
            } catch (e) {
                console.log('Gagal update daftar:', e);
                m.reply('Gagal update daftar, coba lagi nanti.');
            }
        }
                
        // Auto-reply jika ditag di grup dengan teks
                
        if (m.isGroup && m.text?.startsWith('#')) {
          const notesDB = loadNotesDB();
          const gid = m.chat;
          const key = m.text.slice(1).toLowerCase().trim();
          const note = notesDB.groupNotes?.[gid]?.[key];
          if (!note) return;
        
          if (note.type === 'text') {
            return replygcxeon(note.content);
          }
        
          const buffer = Buffer.from(note.content?.data || note.content);
        
          const message = {
            caption: note.caption || '',
            quoted: m
          };
        
          if (note.type.includes('image')) {
            message.image = buffer;
          } else if (note.type.includes('video')) {
            message.video = buffer;
          } else if (note.type.includes('audio')) {
            message.audio = buffer;
          } else if (note.type.includes('sticker')) {
            message.sticker = buffer;
          } else if (note.type.includes('document')) {
            message.document = buffer;
            message.mimetype = note.mimetype || 'application/octet-stream';
            message.fileName = note.fileName || 'file';
          } else {
            return; // jika tipe tidak dikenal, tidak kirim apa-apa
          }

  return XeonBotInc.sendMessage(m.chat, message);
}
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
*⏱️ remindersolat* - Pengingat waktu sholat di grup

*📚 Catatan Grup*
*🗂️ notes* - Melihat nama catatan
*📬 save* (name) - Balas ke pesan yang ingin disimpan
*📭 get* (name) atau #name - Mengambil isi catatan
*🗑️ delnote* - Menghapus catatan


*📂 Konversi Media:*
*📷 toimage* - Mengonversi stiker menjadi gambar
*📹 tovideo* - Mengonversi stiker menjadi video
*🎵 toaudio* - Mengonversi video atau audio menjadi audio
*📂 tomp3* - Mengonversi video atau audio menjadi MP3
*📞 tovn* - Mengonversi audio atau video menjadi voice note (VN)
*🎞️ togif* - Mengonversi stiker menjadi GIF
*🖼️ tikel* - Mengonversi image/video menjadi stiker

*📝 Pembuat Konten:*
*📄 buatpdf* - Mengumpulkan gambar untuk membuat PDF
*🎨 stickerwm* - Menambahkan watermark pada stiker

*_Powered by Ti Unusia Bot._*      
                `;
                await XeonBotInc.sendMessage(m.chat, {
                    react: {
                        text: "🔥", // Emoji reaction
                        key: m.key  // Reaksi ke pesan user yang memicu perintah
                    }
                });            
                XeonBotInc.sendMessage(m.chat, {
                    text: menu
                }, {
                    quoted: m
                });
            }
            break
            
            case 'save': {
              if (!m.isGroup) return replygcxeon('Fitur ini hanya untuk grup!');
              if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon('Hanya admin yang bisa menyimpan notes!');
              if (!args[0]) return replygcxeon('Penggunaan: *.save namakey* (balas pesan yg ingin disimpan)');
              if (!m.quoted) return replygcxeon('Balas pesan yang ingin disimpan.');
            
              const key = args[0].toLowerCase();
              const quoted = m.quoted;
              const gid = m.chat;
              const notesDB = loadNotesDB();
            
              notesDB.groupNotes ??= {};
              notesDB.groupNotes[gid] ??= {};
            
              if (quoted.text && !quoted.mtype) {
                notesDB.groupNotes[gid][key] = {
                  type: 'text',
                  content: quoted.text
                };
              } else if (quoted.mtype) {
                const mime = quoted.mtype;
                const allowed = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'];
                if (!allowed.includes(mime)) return replygcxeon('❌ Jenis media tidak didukung.');
            
                const mediaBuffer = await quoted.download();
            
                notesDB.groupNotes[gid][key] = {
                  type: mime,
                  content: Buffer.from(mediaBuffer),
                  mimetype: quoted.mimetype || null,
                  fileName: quoted.fileName || '',
                  caption: quoted.text || quoted.caption || ''
                };
              } else {
                return replygcxeon('Pesan tidak valid untuk disimpan.');
              }
            
              saveNotesDB(notesDB);
              replygcxeon(`✅ Notes *${key}* berhasil disimpan.`);
            }
            break;
            case 'get': {
              if (!m.isGroup) return replygcxeon('Fitur ini hanya untuk grup!');
              if (!args[0]) return replygcxeon('Penggunaan: *.get namakey*');
            
              const keyGet = args[0].toLowerCase();
              const dbGet = loadNotesDB();
              const noteGet = dbGet.groupNotes?.[m.chat]?.[keyGet];
            
              if (!noteGet) return replygcxeon(`❌ Notes *${keyGet}* tidak ditemukan.`);
            
              if (noteGet.type === 'text') {
                return replygcxeon(noteGet.content);
              }
            
              const contentBuffer = Buffer.from(noteGet.content?.data || noteGet.content);
            
              const message = {
                caption: noteGet.caption || '',
                quoted: m
              };
            
              if (noteGet.type.includes('image')) {
                message.image = contentBuffer;
              } else if (noteGet.type.includes('video')) {
                message.video = contentBuffer;
              } else if (noteGet.type.includes('audio')) {
                message.audio = contentBuffer;
              } else if (noteGet.type.includes('sticker')) {
                message.sticker = contentBuffer;
              } else if (noteGet.type.includes('document')) {
                message.document = contentBuffer;
                message.mimetype = noteGet.mimetype || 'application/octet-stream';
                message.fileName = noteGet.fileName || 'file';
              } else {
                return replygcxeon('⚠️ Format note tidak dikenali atau tidak didukung.');
              }
            
              return XeonBotInc.sendMessage(m.chat, message);
            }
              break;
            case 'notes': {
              if (!m.isGroup) return replygcxeon('Fitur ini hanya untuk grup!');
            
              const db = loadNotesDB();
              const groupNotes = db.groupNotes?.[m.chat];
            
              if (!groupNotes || Object.keys(groupNotes).length === 0) {
                return replygcxeon('Belum ada notes yang disimpan di grup ini.');
              }
            
              let teks = `📌 *Daftar Notes di Grup Ini:*\n\n`;
              let i = 1;
              for (const [key, val] of Object.entries(groupNotes)) {
                const typeLabel = (() => {
                  if (val.type === 'text') return 'text';
                  if (val.type.includes('image')) return 'image';
                  if (val.type.includes('video')) return 'video';
                  if (val.type.includes('audio')) return 'audio';
                  if (val.type.includes('sticker')) return 'sticker';
                  if (val.type.includes('document')) return 'document';
                  return 'media';
                })();
            
                teks += `${i++}. ${key} (${typeLabel})\n`;
              }
            
              replygcxeon(teks);
            }
            break;
            
            case 'delnote':
              if (!m.isGroup) return replygcxeon('Fitur ini hanya untuk grup!');
              if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon('Hanya admin yang bisa menghapus notes!');
              if (!args[0]) return replygcxeon('Penggunaan: *.delnote namakey*');
            
              const keyDel = args[0].toLowerCase();
              const dbDel = loadNotesDB();
            
              if (dbDel.groupNotes?.[m.chat]?.[keyDel]) {
                delete dbDel.groupNotes[m.chat][keyDel];
                saveNotesDB(dbDel);
                replygcxeon(`✅ Notes *${keyDel}* berhasil dihapus.`);
              } else {
                replygcxeon(`❌ Notes *${keyDel}* tidak ditemukan.`);
              }
              break;            
 // Pastikan daftarAcara dibuat global
            case 'buatlist': {
                if (!isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup.');
                const acara = args.join(' ');
                if (!acara) return m.reply('Contoh: .buatlist jalan-jalan ke puncak');
            
                const initialText = `*📌 Nama Acara: ${acara}*\n\nKetik *ikut* jika ingin ikut!\n\n*Peserta:*`;
                const sentMsg = await XeonBotInc.sendMessage(m.chat, { text: initialText });
            
                daftarAcara[m.chat] = {
                    key: sentMsg.key,
                    title: acara,
                    peserta: []
                };
            
                m.reply('List berhasil dibuat. Silakan di PIN.');
            }
            break;
            
            case 'donelist': {
                if (!isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup.');
                if (!daftarAcara[m.chat]) return m.reply('Tidak ada list yang aktif.');
            
                delete daftarAcara[m.chat];
                m.reply('List selesai. Terima kasih untuk yang sudah ikut!');
            }
            break;

            case 'buatabsen': {
                if (!isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup.');
                if (daftarAbsen[m.chat]) return m.reply('(Absensi) sedang berlangsung.');
            
                const judul = args.join(' ');
                if (!judul) return m.reply('Contoh: *.absen Pemrograman Web*');
            
                const text = `*📋 Absen: ${judul}*\n\nKetik *.hadir {nama lengkap}* untuk mengisi absensi.\n\n*Daftar Hadir:*`;
                const sentMsg = await XeonBotInc.sendMessage(m.chat, { text });
            
                daftarAbsen[m.chat] = {
                    key: sentMsg.key,
                    title: judul,
                    peserta: []
                };
            
                m.reply('(Absensi) dimulai. Silakan di PIN.');
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
 

          case 'play': {
                if (!text) return replygcxeon(`Penggunaan: *play* <judul lagu>\nContoh: *play garam dan madu*`)
                replygcxeon(mess.wait)
                try {
                    const res = await fetch(`https://api.nekorinn.my.id/downloader/ytplay-savetube?q=${encodeURIComponent(text)}`)
                    const json = await res.json()
            
                    if (!json.result || !json.result.downloadUrl) return replygcxeon('Lagu tidak ditemukan atau API bermasalah.')
            
                    const { title, channel, duration, imageUrl, link } = json.result.metadata
                    const audio = json.result.downloadUrl
            
                    // Gambar thumbnail
                    const resImg = await fetch(imageUrl)
                    const arrayBuffer = await resImg.arrayBuffer()
                    const img = await loadImage(Buffer.from(arrayBuffer))
            
                    // Setup canvas
                    const canvas = createCanvas(800, 400)
                    const ctx = canvas.getContext('2d')
            
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
                    gradient.addColorStop(0, '#121212')
                    gradient.addColorStop(1, '#1f1f1f')
                    ctx.fillStyle = gradient
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
            
                    ctx.drawImage(img, 40, 80, 240, 240)
            
                    // Judul lagu (multibaris)
                    ctx.fillStyle = '#ffffff'
                    ctx.font = 'bold 32px Sans'
                    const lines = []
                    const words = title.split(' ')
                    let line = ''
                    for (let i = 0; i < words.length; i++) {
                        const testLine = line + words[i] + ' '
                        const metrics = ctx.measureText(testLine)
                        if (metrics.width > 400 && i > 0) {
                            lines.push(line)
                            line = words[i] + ' '
                        } else {
                            line = testLine
                        }
                    }
                    lines.push(line)
                    lines.forEach((l, i) => {
                        ctx.fillText(l.trim(), 310, 150 + i * 35)
                    })
            
                    // Channel & durasi
                    ctx.fillStyle = '#b3b3b3'
                    ctx.font = '24px Sans'
                    ctx.fillText(channel, 310, 240)
                    ctx.fillText(duration, 310, 270)
            
                    // Progress bar (dummy 150/400)
                    ctx.fillStyle = '#555'
                    ctx.fillRect(310, 300, 400, 6)
                    ctx.fillStyle = '#1db954'
                    ctx.fillRect(310, 300, 150, 6)
            
                    const buffer = canvas.toBuffer('image/png')
            
                    await XeonBotInc.sendMessage(m.chat, {
                        image: buffer,
                        caption: `📌 *YouTube Play*\n\n🎵 *Judul:* ${title}\n🎤 *Channel:* ${channel}\n⏱️ *Durasi:* ${duration}`,
                        footer: 'Pilih format download di bawah ini.',
                        templateButtons: [
                           { index: 1, quickReplyButton: { displayText: '🔊 Download MP3', id: `.ytmp3 ${link}` } },
                           { index: 2, quickReplyButton: { displayText: '🎥 Download MP4', id: `.ytmp4 ${link}` } }
                        ]
                    }, { quoted: m })
            
                } catch (err) {
                    console.error(err)
                    replygcxeon('Terjadi kesalahan. Coba lagi nanti.')
                }
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
