export interface TrackingPackageResponseProps {
  codigoEncomenda: string;
  eventos: EventosProps[];
}

export interface EventosProps {
  codigo?: string;
  descricao?: string;
  dtHrCriado?: string;
  tipo?: string;
  urlIcone?: string;
  cidade?: string;
  uf?: string;
  tipoAgencia?: string;
  emoji?: string;
}
