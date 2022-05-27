import { syncSaveLista, syncStartLista } from "../../solicitacao/scripts/sync"
import info from "../../../utils/info"

export default async function syncAll(dispatch: Function){
    try {
        await syncSaveLista(dispatch)
        await syncStartLista(dispatch)
    } catch (error) {
        info.error('syncAll',error)
    }
}