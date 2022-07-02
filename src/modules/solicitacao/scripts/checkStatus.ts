import { Lista } from "../interfaces/Lista"
import { idStatusLista } from "../../../constants/idStatusLista"

export default function checkStatus(listas: Lista[], idLista: number, idRemetente: number, status: keyof typeof idStatusLista){
    const currentLista = listas.find(lista => lista.idLista === idLista)!
    const currentEnderecos = currentLista.listaEnderecos
    const enderecosToCheck = currentEnderecos.filter(endereco => endereco.idRemetente !== idRemetente)

    return enderecosToCheck.every(endereco => endereco.situacao === idStatusLista[status])
}