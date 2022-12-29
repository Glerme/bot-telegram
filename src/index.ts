import TelegramBot from "node-telegram-bot-api";
import { getCommandListText } from "./commands/labelCommands";

import DotEnv from "dotenv-safe";

import { listPackages } from "./commands/listPackages";
import { trackingPackage } from "./commands/trackingPackage";
import { saveFavoritePackages } from "./commands/saveFavoritePackages";

DotEnv.config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

let codigosTestes = ["TE200690411BR", "QM683596338BR", "NA377910329BR"];

bot.onText(/\/start/, (msg) => {
  return bot.sendMessage(
    msg.chat.id,
    `Bem Vindo ao bot de rastreio de encomendas: ${getCommandListText()}`
  );
});

bot.onText(
  /\/rastreio(.*)/g,
  async (msg, match) => await trackingPackage(bot, msg, match)
);

bot.onText(/\/lista/, async (msg) => await listPackages(bot, msg));

bot.onText(
  /\/salvar(.*)/g,
  async (msg, match) => await saveFavoritePackages(bot, msg, match)
);
