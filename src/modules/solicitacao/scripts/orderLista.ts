import { Lista } from "../interfaces/Lista"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"

const orderLista = (listas: Lista[], roteirizacao: RoteirizacaoResponse) => {
    return listas.map(item => {
        const index = roteirizacao.ordenedAdresses.findIndex(i => i.id === item.idRemetente)
        return listas[index]
    })
}

export default orderLista