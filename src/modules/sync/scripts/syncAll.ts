import { syncCancelLista, syncSaveLista, syncStartLista } from "../../solicitacao/scripts/sync"
import info from "../../../utils/info"

export default async function syncAll(dispatch: Function, idMotorista: number){
    try {
        await syncSaveLista(dispatch, idMotorista)
        await syncStartLista(dispatch)
        await syncCancelLista(dispatch, idMotorista)
    } catch (error) {
        info.error('syncAll',error)
    }
}