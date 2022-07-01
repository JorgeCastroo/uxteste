import { Endereco } from "../interfaces/Lista"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"
import info from "../../../utils/info"

export default function findListaPosition(endereco: Endereco, roteirizacao: RoteirizacaoResponse){
    try {
        return roteirizacao.ordenedAdresses.findIndex(i => i.id === endereco.idRemetente)+1
    } catch (error) {
        info.error('findPosition',error)
        return 0
    }
}