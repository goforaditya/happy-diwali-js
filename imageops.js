const fs = require('fs');
const fetch = require('node-fetch');
var Jimp = require('jimp');
const sharp = require('sharp');
const { promisify } = require('util');
const { pipeline } = require('stream');
const { OpenAI } = require('openai');

// Load environment variables from .env file
require('dotenv').config();
const openaiKey = process.env.OPENAI_API_KEY;
// Import the OpenAI module
const openai = new OpenAI({ apiKey: openaiKey });

// const IMAGE_SIZE = 512;
// const IMAGE_ALPHA = 0.3;
// const PROMPT = `Happy Diwali is a specialized GPT designed to focus solely on editing 
// images by adding festive elements like fireworks and dias. Just take the image uploaded
//  and add elements to it. Keep all elements in the uploaded image. Do not ask user for 
//  any details. Its primary goal is to enhance photos of people or places, creating a 
//  celebratory or festive atmosphere. The GPT should concentrate on the technical aspect 
//  of image editing, ensuring that the added elements blend seamlessly with the original 
//  photo. It should provide minimal verbal interaction, focusing instead on the task of 
//  image modification. Happy Diwali will not engage in extended conversations or provide 
//  suggestions unless specifically asked. It should avoid creating images that could be 
//  culturally insensitive or inappropriate. In cases of unclear requests, it will seek 
//  user clarification to ensure accurate results. The personality of Happy Diwali will be
//   straightforward and efficient, aiming to provide quick and effective image enhancements. 
// Just reply with an single image and nothing else.`

const PROMPT = `An indian family celebrating diwali with fireworks and dias at night. and greeting saying happy diwali from Aditya`


async function getImageFromUrl(url, path) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Unexpected response ${response.statusText}`);
    }

    await promisify(pipeline)(
        response.body,
        fs.createWriteStream(path)
    );

    return true
}  

async function editImage(path) {
    console.log(path)
    //remove .jpg and add .png in path
    const newPath = path.replace('.jpg', '.png');
    const result = false;
    sharp(path).toFormat('png').ensureAlpha(IMAGE_ALPHA).resize(IMAGE_SIZE,IMAGE_SIZE).toBuffer().then( data => {
        sharp(data).toFile(newPath, (err, info) => {
            // console.log(info)
        }).then( () => {
            // console.log("Image converted to png")
            result = newPath;
        }).catch( err => {
            // console.log(err)
        })
    })

    return result;
}

async function dalleCreate(maxRetries = 3, delay = 45000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const image = await openai.images.generate({ model: "dall-e-3", prompt: PROMPT });

            console.log(image.data);
            if (image.data[0].url) {
                return image.data[0].url;
            }
        } catch (err) {
            console.log(err);

            // If this is the last retry, rethrow the error
            if (i === maxRetries - 1) {
                throw err;
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// async function dalleCreate() {
//   const image = await openai.images.generate({ model: "dall-e-3", prompt: PROMPT });

//   console.log(image.data);
//   if (image.data[0].url) {
//     return image.data[0].url;
//   }
// }

async function makeDiwaliPicture(contact) {
    const dalle_url = await dalleCreate();
    console.log(dalle_url);
    if (dalle_url) {
        // create dalle image path
        const dalle_path = `data/dalle${contact.number}.png`;
        await getImageFromUrl(dalle_url, dalle_path);
        return dalle_path;
    }
}

module.exports = {
    editImage,
    makeDiwaliPicture
};