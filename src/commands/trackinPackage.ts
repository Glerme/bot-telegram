import { rastrearEncomendas } from "correios-brasil/dist";
import TelegramBot from "node-telegram-bot-api";

export async function trackingPackage(msg: TelegramBot.Message, match?: any) {
  const chatId = msg.chat.id;

  const codRastreio = match[1].replace(" ", "");

  const rastreio = await rastrearEncomendas([codRastreio]);

  console.log(
    "RAST",
    rastreio.map((rast: any) => rast.eventos)
  );
}
