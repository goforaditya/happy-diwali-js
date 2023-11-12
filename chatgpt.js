const { OpenAI } = require('openai');

require('dotenv').config();

const openaiKey = process.env.OPENAI_API_KEY;
// Import the OpenAI module
const openai = new OpenAI({ apiKey: openaiKey });

async function listModels() {
    const list = await openai.models.list();
  
    for await (const model of list) {
      console.log(model);
    }
}

async function greet(wh_message = "") {
    uname = process.env.USER_NAME
    messages = [{"role": "system", "content": `You are a festival greetings bot. This diwali, you want to greet your friends and family. as ${uname}. Craft a respectful and positive diwali greeting with emojis and use hindi as a language.`}]
    // when the user sends a message, append it to the messages array
    if (wh_message != "") {
        messages.push({"role": "user", "content": wh_message})
    }

    console.log(messages)
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  }

// take profile picutre and modify it to add a diwali hat
async function makePicture(pfp_url) {
    // download the profile picture
    
}

function sayHello(name) {
    return `Hello, ${name}!`;
}

// listModels()

module.exports = {
    greet,
    listModels,
    makePicture
};