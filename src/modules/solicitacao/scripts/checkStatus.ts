import { Lista } from "../interfaces/Lista"

export default function checkStatus(lista: Lista, idRemetente: number, statusToCheck: number[]){
    const enderecosToCheck = lista.listaEnderecos.filter(endereco => endereco.idRemetente !== idRemetente && statusToCheck.includes(endereco.situacao ?? 2))

    if(enderecosToCheck.length > 0) return true
    else return false
}