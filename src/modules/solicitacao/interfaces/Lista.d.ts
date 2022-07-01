export interface Lista {
    idLista:          number;
    idUsuario:        number;
    situacao:         number;
    rota:             string;
    dtCadastro:       Date;
    qtdeTotalVolumes: number;
    listaEnderecos:   Endereco[];
}

export interface Endereco {
    idLista:              number;
    rota:                 string;
    idRemetente:          number;
    nomeCliente:          string;
    nomeResponsavel:      string;
    documentoResponsavel: string;
    logradouro:           string;
    numero:               string;
    bairro:               string;
    cidade:               string;
    uf:                   string;
    cep:                  string;
    telPrincipal:         string;
    latitudeDestino:      string;
    longitudeDestino:     string;
    situacao?:            number;
    qtdeVolumes:          number;
    listaVolumes:         ListaVolume[];
}

export interface ListaVolume {
    idVolume:           number;
    idLista:            number;
    etiqueta:           string;
    dtLeituraFirstMile: string;
}