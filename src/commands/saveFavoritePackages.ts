import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from "../../node_modules/.prisma/client";

import { v4 } from "uuid";

import { parsedTrackingCodes } from "../functions/parsedTrackingCodes";
import { commands, getCommandFullDescription } from "./labelCommands";

const prisma = new PrismaClient();

export async function saveFavoritePackages(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  match: RegExpExecArray
) {
  const chatId = msg.chat.id;

  if (match[1] === "") {
    return bot.sendMessage(
      msg.chat.id,
      `${getCommandFullDescription(commands[1])}`
    );
  }

  try {
    bot.sendMessage(chatId, "Salvando códigos...");

    const trackingCodesRaw = parsedTrackingCodes(match[1]);

    await prisma.user.upsert({
      where: {
        chatId: `${chatId}`,
      },
      update: {
        trackings: {
          create: {
            id: v4(),
            codigo: trackingCodesRaw[0],
            createdAt: new Date(),
          },
        },
      },
      create: {
        chatId: `${chatId}`,
        id: v4(),
        name: msg.chat.first_name + " " + msg.chat.last_name,
        userName: msg.chat.username,
        createdAt: new Date(),
        trackings: {
          create: {
            id: v4(),
            codigo: trackingCodesRaw[0],
            createdAt: new Date(),
          },
        },
      },
    });

    return bot.sendMessage(chatId, "Códigos salvos!");
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Ocorreu um erro, por favor tente mais tarde.");
  }
}
