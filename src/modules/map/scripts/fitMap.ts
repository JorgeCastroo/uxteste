import { Lista } from "../../solicitacao/interfaces/Lista"
import { Coordinates } from "../../../interfaces/Coordinates"
import info from "../../../utils/info"

export default function fitMap(listas: Lista[], mapRef: any){
    try {
        const bounds = { top: 100, bottom: 100, left: 100, right: 100 }
        const markers: Coordinates[] = listas.map(item => {
            return {
                latitude: Number(item.latitudeDestino),
                longitude: Number(item.longitudeDestino),
            }
        })
        mapRef!.fitToCoordinates(markers, bounds)
    } catch (error) {
        info.error('fitMap',error)
    }
}