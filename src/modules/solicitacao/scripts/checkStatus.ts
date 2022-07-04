import { Lista } from "../interfaces/Lista"
import { idStatusLista } from "../../../constants/idStatusLista"

export default function checkStatus(listas: Lista[], idLista: number, idRemetente: number, status: keyof typeof idStatusLista){
    const currentLista = listas.find(lista => lista.idLista === idLista)!
    const currentEnderecos = currentLista.listaEnderecos
    const enderecosToCheck = currentEnderecos.filter(endereco => endereco.idRemetente !== idRemetente)

    if(enderecosToCheck.length > 0) return !enderecosToCheck.some(endereco => endereco.situacao === idStatusLista[status])
    else return true
}