import { Lista } from "../interfaces/Lista"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"
import getAddresses from "./getAddresses"
import orderEndereco from "./orderEndereco"

const orderLista = (listas: Lista[], roteirizacao: RoteirizacaoResponse) => {
    return orderEndereco(getAddresses(listas), roteirizacao)
}

export default orderLista