import { Endereco, Lista } from "../interfaces/Lista"

export default function findEndereco(listas: Lista[], idRemetente: number): Endereco {
    return listas.find(lista => lista.listaEnderecos.find(endereco => endereco.idRemetente === idRemetente))!.listaEnderecos.find(endereco => endereco.idRemetente === idRemetente)!
}