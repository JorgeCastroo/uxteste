export interface ListaAtualizada {
    idLista:      number;
    idRemetente:  number;
    listaVolumes: ListaVolume[];
}

export interface ListaVolume {
    idVolume: number;
    etiqueta: string;
}