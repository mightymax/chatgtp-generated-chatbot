# OpenAI project

The scope of this project is to create a working chatbot without any custom coding, only use ChatGTP to generate files.

[Here you can find the used chat](https://chat.openai.com/share/6dd36097-ebc4-40fa-b789-40da0b5dbe75)

## How to use

```bash
git clone chatgtp-generated-chatbot
cd chatgtp-generated-chatbot
npm i
pip install openai python-dotenv json
```

Next create a file `.env` and make sure you store your ChatGTP API key:
```env
API_KEY=[content-of-your-key]
```

Note that this `.env` file is included in `.gitignore` to prevent your token being exposed in Github.

