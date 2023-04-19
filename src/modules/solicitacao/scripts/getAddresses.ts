import { Lista } from "../interfaces/Lista"

export default function getAddresses(lista: Lista[]){   
    return lista.map(l => l.listaEnderecos.map(endereco => endereco)).flat(1)
}