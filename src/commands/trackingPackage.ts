import TelegramBot from "node-telegram-bot-api";
import { rastrearEncomendas } from "correios-brasil/dist";
import format from "date-format";

import { parsedTrackingCodes } from "../functions/parsedTrackingCodes";

import { TrackingPackageRequestProps } from "../@types/TrackingPackageRequestProps";
import { TrackingPackageResponseProps } from "../@types/TrackingPackageResponseProps";

import { emojis } from "../constants/emojis";

import { commands, getCommandFullDescription } from "./labelCommands";
import { trackingPackageFactory } from "../factories/trackinPackageFactory";

export async function trackingPackage(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  match: string
) {
  const chatId = msg.chat.id;

  if (match === "") {
    bot.sendMessage(msg.chat.id, `${getCommandFullDescription(commands[0])}`);

    return;
  }

  try {
    bot.sendMessage(msg.chat.id, "Buscando encomendas...");

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

    const trackingPackages: TrackingPackageRequestProps[] =
      await rastrearEncomendas([...trackingCodesRaw]);

    let errorsMessage = [];

    errorsMessage = trackingPackages?.map((tracking) => ({
      codEncomenda: tracking?.codObjeto,
      message: tracking?.mensagem,
    }));

    if (errorsMessage[0].message) {
      errorsMessage.map((errorMessage) =>
        bot.sendMessage(
          msg.chat.id,
          ` ${emojis.error} Ocorreu um erro com o Código ${errorMessage.codEncomenda},
         \n Mensagem: \n${errorMessage.message}`
        )
      );

      return;
    }

    const parsedTrackingPackages = trackingPackages.map(trackingPackageFactory);

    parsedTrackingPackages.map(
      ({ codigoEncomenda, eventos }: TrackingPackageResponseProps) =>
        bot.sendMessage(
          chatId,
          `- Código da encomenda: ${codigoEncomenda}
        ${eventos.map(
          (evento) => `
          ------------------------------------------------------------
          ${evento.emoji}
          
          Descrição: ${evento.descricao},
          Cidade: ${evento.cidade},
          Estado: ${evento.uf},
          Data: ${format("dd/MM/yyyy - hh:mm", new Date(evento.dtHrCriado))}`
        )}`
        )
    );
  } catch (err) {
    console.error(err);
    bot.sendMessage(
      chatId,
      `${emojis.error} Ocorreu um erro, por favor tente mais tarde.`
    );
    return;
  }
}
