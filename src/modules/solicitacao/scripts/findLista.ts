import { Lista } from "../interfaces/Lista"

export default function findLista(listas: Lista[], idRemetente: number){
    return listas.find(lista => lista.idRemetente === idRemetente)!
}