import { Lista } from "../interfaces/Lista"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"
import info from "../../../utils/info"

export default function findListaPosition(lista: Lista, roteirizacao: RoteirizacaoResponse){
    try {
        return roteirizacao.ordenedAdresses.findIndex(i => i.id === lista.idRemetente)+1
    } catch (error) {
        info.error('findPosition',error)
        return 0
    }
}