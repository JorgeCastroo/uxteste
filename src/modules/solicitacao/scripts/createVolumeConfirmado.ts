import { VolumeAtualizado } from "../interfaces/VolumeAtualizado"
import { VolumeConfirmado } from "../interfaces/VolumeConfirmado"

export default function createVolumeConfirmado(lista: VolumeAtualizado[]): VolumeConfirmado[] {
    return lista.map(lista => ({
        idLista: lista.idLista,
        listaVolumes: lista.listaVolumes.map(volume => volume.idVolume)
    }))
}