
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '6772195764:AAGew0HzUjxK4sLI-lD9vqQ5qnhelnD4cd8'
const webAppUrl = 'https://shimmering-granita-28d79c.netlify.app/';

const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(express.json());
app.use(cors());


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;


    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появится кнопка, редактировать обьявление', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Редактировать обьявление', web_app: {url: webAppUrl + 'edit'}}]
                ]
            }
        })


        await bot.sendMessage(chatId, 'Ниже появится кнопка, создать обьявление', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Создать обьявление', web_app: { url: webAppUrl } }]
                ]
            }
        })
    }



});






const PORT = 8000;
app.listen(PORT, () => console.log('server stardet', PORT))


app.post('/web-data', async (req, res) => {
    const {price, currency, queryId} = req.body;
    console.log(req.body)
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Данные пришли , ${currency} ${price}`
            }
        })
        return res.status(200).json({price, currency});
    } catch (e) {
        return res.status(500).json({})
    }
})

app.get('/web-data', async (req, res) => {return res.status(200).json('sdfsdf');})