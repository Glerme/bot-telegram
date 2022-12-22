import TelegramBot from "node-telegram-bot-api";
import { rastrearEncomendas } from "correios-brasil/dist";

import { trackingPackageFactory } from "../factories/trackinPackageFactory";

export async function trackingPackage(
  msg: TelegramBot.Message,
  match?: RegExpExecArray
) {
  const chatId = msg.chat.id;

  try {
    const trackingCodesRaw = match[1].replace(" ", "").split(/[;,./-]/g);

    const countTrackingCodes = trackingCodesRaw.filter(
      (rastreio) => rastreio.length !== 13
    );

    if (countTrackingCodes) {
    }

    const trackingCodes = await rastrearEncomendas([...trackingCodesRaw]);

    console.log("trackingCodes", trackingCodes);

    const parsedTrackingPackages = trackingCodes.map((trackingCode) =>
      trackingPackageFactory(trackingCode.eventos)
    );

    console.log("RAST unidade", parsedTrackingPackages);
  } catch (err) {
    console.error(err);
  }
}
