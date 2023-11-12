const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const {greet, listModels, makePicture} = require('./chatgpt.js')
const fetch = require('node-fetch');
const Jimp = require('jimp');
const {editImage, makeDiwaliPicture} = require('./imageops.js');
const path = require('path');
// Load environment variables from .env file
require('dotenv').config();

// Load FAVORITE_NUMBERS from process.env and split it into an array of strings
const initial_numbers = process.env.FAVORITE_NUMBERS.split(',');

// Print the favorite numbers using a for loop
for (let i = 0; i < initial_numbers.length; i++) {
    console.log(initial_numbers[i]);
}

const wh_client = new Client({
    authStrategy: new LocalAuth()
});

wh_client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    // console.log('QR RECEIVED', qr);
});

wh_client.on('ready', async () => {
    console.log('Client is ready!');
}
);

wh_client.initialize();


wh_client.on('ready', async () => {
    // console.log('MSG CREATE', msg.body);
    for (let number of initial_numbers) {
        let contact = await wh_client.getContactById(number)
        let chat = await contact.getChat()
        console.log(`\nCHAT IS : ==> ${JSON.stringify(chat)}\n`)
        greeting = await greet()
        console.log(`\nGREETING IS : ==> ${greeting}\n`)
        await chat.sendMessage(greeting)
        const picture = await makeDiwaliPicture(contact)
        console.log(`\nPICTURE IS : ==> ${picture}\n`)
        const media = MessageMedia.fromFilePath(picture);
        await chat.sendMessage(media);
        await chat.sendMessage("Made by https://goforaditya.github.io/happy-diwali-js/ using OpenAI's DALL-E and GPT-3.5 ")
    }
});

// wh_client.on('message', msg => {
//     console.log('MESSAGE RECEIVED', msg.body);
//     console.log(msg.from)
//     // wh_client.sendMessage(msg.from,"Happy Diwali !!!")
//     console.log(msg)
//     msg.reply(greet(msg.body));
// });

