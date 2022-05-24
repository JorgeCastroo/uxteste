export interface Lista {
    idLista:              number;
    idUsuario:            number;
    nomeCliente:          string;
    nomeResponsavel:      string;
    qtdeVolumes:          number;
    documentoResponsavel: string;
    logradouro:           string;
    numero:               string;
    complemento:          string;
    bairro:               string;
    cidade:               string;
    uf:                   string;
    cep:                  string;
    telPrincipal:         string;
    latitudeDestino:      string;
    longitudeDestino:     string;
    situacao:             string;
    dtCadastro:           Date;
    listaVolumes:         ListaVolume[];
}

export interface ListaVolume {
    idVolume:           number;
    idLista:            number;
    etiqueta:           string;
    dtLeituraFirstMile: string;
}