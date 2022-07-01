import { Coordinates } from "../../../interfaces/Coordinates"
import { RoteirizacaoPayload } from "../../../interfaces/Roteirizacao"
import { Lista } from "../../solicitacao/interfaces/Lista"
import localSetCoords from "./local/localSetCoords"

export default async function createRoteirizacaoPayload(dispatch: Function, listas: Lista[], coords: Coordinates): Promise<RoteirizacaoPayload> {

    const lastList = listas[listas.length - 1]

    const start = {
        latitude: coords.latitude,
        longitude: coords.longitude,
    }
    const end = {
        latitude: Number(lastList.listaEnderecos[lastList.listaEnderecos.length - 1].latitudeDestino),
        longitude: Number(lastList.listaEnderecos[lastList.listaEnderecos.length - 1].longitudeDestino),
    }
    
    await localSetCoords(dispatch, start, end)

    const adresses: RoteirizacaoPayload['adresses'] = listas.map(lista => lista.listaEnderecos.map(endereco => {
        return {
            description: endereco.nomeCliente,
            id: endereco.idRemetente,
            location: {
                latitude: Number(endereco.latitudeDestino),
                longitude: Number(endereco.longitudeDestino),
            }
        }
    })).flat(1)

    return { start, end, adresses }
}