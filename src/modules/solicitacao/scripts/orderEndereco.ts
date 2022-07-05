import { Endereco } from "../interfaces/Lista"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"

export default function orderEndereco(enderecos: Endereco[], roteirizacao: RoteirizacaoResponse){
    return enderecos.map(item => {
        const index = roteirizacao.ordenedAdresses.findIndex(i => i.id === item.idRemetente)
        return enderecos[index]
    })
}