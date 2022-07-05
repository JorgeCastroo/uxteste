import { Endereco, Lista } from "../interfaces/Lista"

export default function findEndereco(listas: Lista[], endereco: Endereco): Endereco {
    const { idLista, idRemetente } = endereco
    const enderecos = listas.find(lista => lista.listaEnderecos.find(f => f.idRemetente === idRemetente && f.idLista === idLista))!.listaEnderecos

    return enderecos.find(endereco => endereco.idRemetente === idRemetente)!
}