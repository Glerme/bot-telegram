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
  bot.sendMessage(
    msg.chat.id,
    `Bem Vindo ao bot de rastreio de encomendas: ${getCommandListText()}`
  );
  return;
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, getCommandListText());
  return;
});

bot.onText(
  /\/rastreio(.*)/g,
  async (msg, match) => await trackingPackage(bot, msg, match[1])
);

bot.onText(/\/listar/, async (msg) => await listPackages(bot, msg));

bot.onText(
  /\/salvar(.*)/g,
  async (msg, match) => await saveFavoritePackages(bot, msg, match[1])
);
