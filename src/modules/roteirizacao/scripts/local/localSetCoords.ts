import { Coordinates } from "../../../../interfaces/Coordinates"
import { setEndCoords, setStartCoords } from "../../reducers/roteirizacaoReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localSetCoords(dispatch: Function, startCoords: Coordinates, endCoords: Coordinates) {
    try {
        await storage.setItem('coords', {startCoords, endCoords})
        dispatch(setStartCoords(startCoords))
        dispatch(setEndCoords(endCoords))
    } catch (error) {
        info.error('localSetCoords',error)
    }
}