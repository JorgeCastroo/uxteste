import { VolumeAtualizado } from "../interfaces/VolumeAtualizado"
import { ListaConfirmada } from "../interfaces/ListaConfirmada"

export default function createListaConfirmada(lista: VolumeAtualizado[]): ListaConfirmada[] {
    return lista.map(lista => ({
        idLista: lista.idLista,
        listaVolumes: lista.listaVolumes.map(volume => volume.idVolume)
    }))
}