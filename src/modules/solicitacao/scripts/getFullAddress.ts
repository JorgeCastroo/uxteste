import { Endereco } from "../interfaces/Lista"

export default function getFullAddress(endereco: Endereco){
    return `${endereco.logradouro}, ${endereco.numero}, ${endereco.cep} - ${endereco.uf} ${endereco.bairro}`
}