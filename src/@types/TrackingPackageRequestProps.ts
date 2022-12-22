export interface TrackingPackageRequestProps {
  codigo?: string;
  descricao?: string;
  dtHrCriado?: string;
  tipo?: string;
  urlIcone?: string;
  unidade?: {
    endereco: { cidade: string; uf: string };
    tipo: string;
  };
}
