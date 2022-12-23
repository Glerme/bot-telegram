export interface TrackingPackageRequestProps {
  codObjeto: string;
  dtPrevista: string;
  mensagem?: string;
  eventos: {
    codigo?: string;
    descricao?: string;
    dtHrCriado?: string;
    tipo?: string;
    urlIcone?: string;
    unidade?: {
      endereco: { cidade: string; uf: string };
      tipo: string;
    };
  }[];
  modalidade: string;
  tipoPostal: {
    categoria: string;
    descricao: string;
    sigla: string;
  };
  habilitaAutoDeclaracao: boolean;
  permiteEncargoImportacao: boolean;
  habilitaPercorridaCarteiro: boolean;
  bloqueioObjeto: boolean;
  possuiLocker: boolean;
  habilitaLocker: boolean;
  habilitaCrowdshipping: boolean;
}
