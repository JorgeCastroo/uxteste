import { Lista } from "../interfaces/Lista"
import { idStatusLista } from "../../../constants/idStatusLista"

export default function checkStatus(lista: Lista, idRemetente: number, statusToCheck: Array<keyof typeof idStatusLista>){
    const enderecosToCheck = lista.listaEnderecos.filter(endereco => endereco.idRemetente !== idRemetente && statusToCheck.map(status => idStatusLista[status]).includes(endereco.situacao ?? 2))

    return enderecosToCheck.length > 0
}