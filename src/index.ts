import TelegramBot from "node-telegram-bot-api";
import { getCommandListText } from "./commands/labelCommands";

import DotEnv from "dotenv-safe";

import { trackingPackage } from "./commands/trackingPackage";

DotEnv.config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

let codRastreio = ["NA345819703BR", "NA377910329BR", "QM683596338BR"];

bot.onText(/\/start/, (msg) => {
  return bot.sendMessage(
    msg.chat.id,
    `Bem Vindo ao bot de rastreio de encomendas 
    ${getCommandListText()}`
  );
});

bot.onText(/\/rastreio(.*)/g, trackingPackage);
