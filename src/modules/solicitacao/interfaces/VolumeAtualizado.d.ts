import { ListaVolume } from "./Lista"

export interface VolumeAtualizado {
    idLista:      number
    idRemetente:  number
    listaVolumes: ListaVolume[]
}