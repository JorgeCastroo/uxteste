import { Lista } from "../../solicitacao/interfaces/Lista"
import { Coordinates } from "../../../interfaces/Coordinates"
import info from "../../../utils/info"

export default function fitMap(mapRef: any, listas: Lista[], start: Coordinates, end: Coordinates){
    try {
        const bounds = { top: 20, bottom: 20, left: 20, right: 20 }
        const markers: Coordinates[] = listas.map(item => {
            return {
                latitude: Number(item.latitudeDestino),
                longitude: Number(item.longitudeDestino),
            }
        })
        mapRef!.fitToCoordinates([...markers, start, end], bounds)
    } catch (error) {
        info.error('fitMap',error)
    }
}