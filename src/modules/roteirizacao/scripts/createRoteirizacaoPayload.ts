import { RoteirizacaoPayload } from "../../../interfaces/Roteirizacao"
import { Lista } from "../../solicitacao/interfaces/Lista"
import localSetCoords from "./local/localSetCoords"

export default async function createRoteirizacaoPayload(dispatch: Function, listas: Lista[]): Promise<RoteirizacaoPayload> {
    const start = {
        latitude: -23.5092856,
        longitude: -46.4482788,
    }
    const end = {
        latitude: -23.5092856,
        longitude: -46.4482788,
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

    return {
        start,
        end,
        adresses,
    }
}