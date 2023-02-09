export type SolicitacaoRoutesParams = {
  rotas: undefined;
  solicitacaoList: {
    idLista: number;
    idUsuario: number;
    situacao: number;
    rota: string;
    dtCadastro: Date;
    qtdeTotalVolumes: number;
    listaEnderecos: Endereco[];
  };
  solicitacaoReceivement: undefined;
  solicitacaoScan: undefined;
  solicitacaoScanList: undefined;
};
