import { TrackingPackageRequestProps } from "../@types/TrackingPackageRequestProps";
import { TrackingPackageResponseProps } from "../@types/TrackingPackageResponseProps";

export function trackingPackageFactory(
  trackingPackage: TrackingPackageRequestProps
): TrackingPackageResponseProps {
  console.log("TRACKINF", trackingPackage);

  return {
    codigo: trackingPackage?.codigo,
    descricao: trackingPackage?.descricao,
    dtHrCriado: trackingPackage?.dtHrCriado,
    tipo: trackingPackage?.tipo,
    cidade: trackingPackage?.unidade?.endereco?.cidade,
    uf: trackingPackage?.unidade?.endereco?.uf,
    urlIcone: trackingPackage?.urlIcone,
    tipoAgencia: trackingPackage?.unidade?.tipo,
  };
}
