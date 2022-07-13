import { Endereco } from "../interfaces/Lista"
import { ListaConfirmado } from "../interfaces/ListaConfirmado"

export default function createListaConfirmada(enderecos: Endereco[]): ListaConfirmado[] {
    return enderecos.map(endereco => ({
        idLista: endereco.idLista,
        listaVolumes: endereco.listaVolumes.map(volume => volume.idVolume)
    }))
}