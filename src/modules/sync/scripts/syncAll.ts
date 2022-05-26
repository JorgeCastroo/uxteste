import { syncSaveLista } from "../modules/lista"
import info from "../../../utils/info"

export default async function syncAll(dispatch: Function){
    try {
        await syncSaveLista(dispatch)
    } catch (error) {
        info.error('syncAll',error)
    }
}