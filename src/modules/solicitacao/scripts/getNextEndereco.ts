import { Lista } from "../interfaces/Lista"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"
import orderEndereco from "./orderEndereco"

export default function getNextEndereco(listas: Lista[], roteirizacao: RoteirizacaoResponse){
    return orderEndereco(listas.map(l => l.listaEnderecos.map(e => e)).flat(1), roteirizacao).find(f => ![5, 6].includes(f.situacao ?? 2))?.logradouro
}