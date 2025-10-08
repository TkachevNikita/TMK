import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;

const webAppUrl = 'https://tkachevnikita.github.io/TMK/'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
  ctx.reply(
    'Добро пожаловать в магазин ТМК! Кликайте по кнопке перейти в магазин, чтобы выбрать необходимый товар и заказать его',
    Markup.keyboard([
      Markup.button.webApp('Перейти в магазин', `${webAppUrl}`),
    ])
  )
})

bot.launch()
