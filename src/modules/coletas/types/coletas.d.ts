export interface Coletas {
    id: number;
    idUsuario: number;
    nomeCliente: string;
    nomeResponsavel: string;
    documentoResponsavel: string;
    qtdeVolumes: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    telPrincipal: string;
    latitudeDestino: string;
    longitudeDestino: string;
    latitudeCheckin: null;
    longitudeCheckin: null;
    latitudeCheckout: null;
    longitudeCheckout: null;
    dtAceite: Date;
    dtRecusa: null;
    situacao: string;
    dtCadastro: Date;
}

export interface Volumes {
    id: number,
    idLista: number,
    etiqueta: string,
    dtLeitura: Date,
    status: string
}

