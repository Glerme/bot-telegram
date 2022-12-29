import { PrismaClient } from "../../node_modules/.prisma/client";
import format from "date-format";

import TelegramBot from "node-telegram-bot-api";

const prisma = new PrismaClient();

export async function listPackages(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;

  try {
    bot.sendMessage(chatId, "Buscando códigos...");

    const upsertNewCodes = await prisma.user.findUnique({
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

    if (upsertNewCodes?.trackings?.length === 0) {
      return bot.sendMessage(chatId, "Nenhuma encomenda encotrada!");
    }

    return upsertNewCodes?.trackings?.map((tracking) =>
      bot.sendMessage(
        chatId,
        `- Código da encomenda: ${tracking.codigo}
         - Descrição: ${tracking.descricao}
         - Criado em: ${format(
           "dd/MM/yyyy - hh:mm",
           new Date(tracking.createdAt)
         )}`
      )
    );
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Ocorreu um erro, por favor tente mais tarde.");
  }
}
