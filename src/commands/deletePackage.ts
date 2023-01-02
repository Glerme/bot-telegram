import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";

import { emojis } from "../constants/emojis";

const prisma = new PrismaClient();

export async function deletePackage(
  bot: TelegramBot,
  chatId: number,
  message: string
) {
  try {
    const deletePackage = await prisma.trackings.delete({
      where: {
        codigo: message,
      },
    });

    console.log(deletePackage);

    bot.sendMessage(chatId, "Código deletado com sucesso!");
  } catch (err) {
    console.error(err);
    bot.sendMessage(
      chatId,
      `${emojis.error} Ocorreu um erro, por favor tente mais tarde.`
    );
    return;
  }
}
