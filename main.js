const executePythonScript = require('./pythonExecutor'); // Adjust the path accordingly
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai'); // Make sure to install the 'openai' package
const app = express();
require('dotenv').config()
const port = 3000;

const configuration = new Configuration({
  apiKey: process.env.API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// POST endpoint to get a response from ChatGPT
app.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const response = await askChatGpt(prompt);
    res.json({ response });
  } catch (error) {
    res.json({ response: `Something went wrong: ${error.message}`, error: true});
  }
});

app.post('/ask-python', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const response = await executePythonScript('chatbot.py', [prompt] )
  res.json({ response: response.response })
})

// Function to get a response from ChatGPT
async function askChatGpt(content) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": content}, {role: "user", content: content}],
  });
  return completion.data.choices[0].message.content ?? '[no content]';

}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
