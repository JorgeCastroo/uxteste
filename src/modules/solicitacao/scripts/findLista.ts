import { Lista } from "../interfaces/Lista"

export default function findLista(listas: Lista[], idLista: number){
    return listas.find(lista => lista.idLista === idLista)!
}