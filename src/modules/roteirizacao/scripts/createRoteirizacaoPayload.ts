import { Coordinates } from "../../../interfaces/Coordinates"
import { RoteirizacaoPayload } from "../../../interfaces/Roteirizacao"
import { Lista } from "../../solicitacao/interfaces/Lista"
import localSetCoords from "./local/localSetCoords"

export default async function createRoteirizacaoPayload(dispatch: Function, listas: Lista[], coords: Coordinates): Promise<RoteirizacaoPayload> {
    const start = {
        latitude: coords.latitude,
        longitude: coords.longitude,
    }
    const end = {
        latitude: Number(listas[listas.length - 1].latitudeDestino),
        longitude: Number(listas[listas.length - 1].longitudeDestino),
    }
    
    await localSetCoords(dispatch, start, end)
    
    const adresses: RoteirizacaoPayload['adresses'] = listas.map(lista => {
        return {
            description: lista.nomeCliente,
            id: lista.idLista,
            location: {
                latitude: Number(lista.latitudeDestino),
                longitude: Number(lista.longitudeDestino),
            }
        }
    })

    return { start, end, adresses }
}