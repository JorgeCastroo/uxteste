import { Endereco, Lista } from "../interfaces/Lista"

export default function findEndereco(listas: Lista[], endereco: Endereco): Endereco {
    const { idLista, idRemetente } = endereco

    return listas.find(lista => lista.listaEnderecos.find(endereco => endereco.idRemetente === idRemetente && endereco.idLista === idLista))!.listaEnderecos.find(endereco => endereco.idRemetente === idRemetente)!
}