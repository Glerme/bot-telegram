import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";
import { v4 } from "uuid";

import { emojis } from "../constants/emojis";

import { parsedTrackingCodes } from "../functions/parsedTrackingCodes";
import { commands, getCommandFullDescription } from "./labelCommands";

const prisma = new PrismaClient();

export async function saveFavoritePackages(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  match: string
) {
  const chatId = msg.chat.id;

  if (match === "") {
    bot.sendMessage(msg.chat.id, `${getCommandFullDescription(commands[1])}`);

    return;
  }

  try {
    bot.sendMessage(chatId, "Salvando códigos...");

    const trackingCodesRaw = parsedTrackingCodes(match);

    const countCharactersTrackingCodes = trackingCodesRaw.filter(
      (rastreio) => rastreio.length !== 13
    );

    if (countCharactersTrackingCodes.length > 0) {
      countCharactersTrackingCodes?.length === 1
        ? bot.sendMessage(
            msg.chat.id,
            `O Código ${countCharactersTrackingCodes
              .map((cod) => cod)
              .join(",")} está inválido!`
          )
        : bot.sendMessage(
            msg.chat.id,
            `Os Códigos ${countCharactersTrackingCodes
              .map((cod) => cod)
              .join(",")} estão inválidos!`
          );
      return;
    }

    for (const code of trackingCodesRaw) {
      const getOneTracking = prisma.trackings.findUnique({
        where: {
          codigo: code,
        },
      });

      if (getOneTracking)
        return bot.sendMessage(
          msg.chat.id,
          `O Código ${code} já está cadastrado!`
        );

      await prisma.user.upsert({
        where: {
          chatId: `${chatId}`,
        },
        update: {
          trackings: {
            create: {
              id: v4(),
              codigo: code,
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
              codigo: code,
              createdAt: new Date(),
            },
          },
        },
      });
    }

    bot.sendMessage(chatId, "Códigos salvos!");

    return;
  } catch (err) {
    console.error(err);
    bot.sendMessage(
      chatId,
      `${emojis.error} Ocorreu um erro, por favor tente mais tarde.`
    );
    return;
  }
}
