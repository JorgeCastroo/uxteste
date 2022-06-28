export interface ListaAtualizada {
    idLista:      number;
    listaVolumes: ListaVolume[];
}

export interface ListaVolume {
    idVolume: number;
    etiqueta: string;
}