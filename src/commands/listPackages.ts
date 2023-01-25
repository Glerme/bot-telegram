import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";

import { emojis } from "../constants/emojis";

import { deletePackage } from "./deletePackage";
import { trackingPackage } from "./trackingPackage";

const prisma = new PrismaClient();

export async function listPackages(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;

  try {
    bot.sendMessage(chatId, "Buscando códigos...");

    const findTrackings = await prisma.user.findUnique({
      where: {
        chatId: `${msg.chat.id}`,
      },
      select: {
        trackings: {
          include: {
            User: true,
          },
        },
      },
    });

    if (findTrackings?.trackings?.length === 0) {
      bot.sendMessage(chatId, "Nenhuma encomenda encotrada!");
      return;
    }

    findTrackings?.trackings?.map((tracking) =>
      bot.sendMessage(chatId, `- Código da encomenda: ${tracking.codigo}`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Listar Encomenda",
                callback_data: `list ${tracking.codigo}`,
              },
              {
                text: "Deletar Encomenda",
                callback_data: `delete ${tracking.codigo}`,
              },
            ],
          ],
        },
      })
    );

    bot.on("callback_query", async (query) => {
      const [type, message] = query.data.split(" ");

      if (type === "list") {
        await trackingPackage(bot, msg, message);
      } else {
        await deletePackage(bot, chatId, message);
      }
    });

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
