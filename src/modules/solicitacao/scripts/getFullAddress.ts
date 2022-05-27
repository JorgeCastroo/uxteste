import { Lista } from "../interfaces/Lista"

export default function getFullAddress(lista: Lista){
    return `${lista.logradouro}, ${lista.numero}, ${lista.cep} - ${lista.uf} ${lista.bairro}`
}