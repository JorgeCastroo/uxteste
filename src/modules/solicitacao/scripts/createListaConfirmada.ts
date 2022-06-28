import { ListaAtualizada } from "../interfaces/ListaAtualizada"
import { ListaConfirmada } from "../interfaces/ListaConfirmada"

export default function createListaConfirmada(lista: ListaAtualizada[]): ListaConfirmada[] {
    return lista.map(lista => ({
        idLista: lista.idLista,
        listaVolumes: lista.listaVolumes.map(volume => volume.idVolume)
    }))
}