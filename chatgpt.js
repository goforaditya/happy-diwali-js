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

async function createCompletionWithRetry(messages, maxRetries = 3, delay = 45000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });

      // console.log(completion);
      return completion;
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



async function greet(wh_message = "") {
    uname = process.env.USER_NAME
    messages = [{"role": "system", "content": `You are a festival greetings bot. This diwali, you want to greet your friends and family. as ${uname}. Craft a respectful and polite greeting for your friends and family with emojis.`}]
    // when the user sends a message, append it to the messages array
    if (wh_message != "") {
        messages.push({"role": "user", "content": wh_message})
    }

    // console.log(messages)
  
    const completion = await createCompletionWithRetry(messages);
  
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