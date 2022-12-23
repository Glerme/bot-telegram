import { TrackingPackageRequestProps } from "../@types/TrackingPackageRequestProps";
import { TrackingPackageResponseProps } from "../@types/TrackingPackageResponseProps";
import { emojis } from "../constants/emojis";

export function trackingPackageFactory(
  trackingPackage: TrackingPackageRequestProps
): TrackingPackageResponseProps {
  const parsed = {
    codigoEncomenda: trackingPackage.codObjeto,
    eventos: trackingPackage?.eventos.map((evento) => ({
      codigo: evento?.codigo ?? " - ",
      descricao: evento?.descricao ?? " - ",
      dtHrCriado: evento?.dtHrCriado ?? " - ",
      tipo: evento?.tipo ?? " - ",
      cidade: evento?.unidade?.endereco?.cidade ?? " - ",
      uf: evento?.unidade?.endereco?.uf ?? " - ",
      urlIcone: evento?.urlIcone ?? " - ",
      tipoAgencia: evento?.unidade?.tipo ?? " - ",
      emoji:
        evento.descricao === "Objeto postado"
          ? emojis.post
          : evento.descricao === "Objeto em trânsito - por favor aguarde"
          ? emojis.onDelivery
          : evento.descricao === "Objeto saiu para entrega ao destinatário"
          ? emojis.inRoute
          : emojis.delivered,
    })),
  };

  return parsed;
}
