import { setEndCoords, setStartCoords } from "../../reducers/roteirizacaoReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localGetCoords(dispatch: Function){
    try {
        const coords = await storage.getItem<any>('coords')
        if(!!coords){
            dispatch(setStartCoords(coords.startCoords))
            dispatch(setEndCoords(coords.endCoords))
        }
    } catch (error) {
        info.error('localGetCoords',error)
    }
}