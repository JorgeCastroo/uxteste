import { setSyncLoading } from "../reducers/syncReducer"
import { syncCancelLista, syncSaveLista, syncStartLista } from "../../solicitacao/scripts/sync"
import info from "../../../utils/info"

export default async function syncAll(dispatch: Function, idMotorista: number){
    try {
        dispatch(setSyncLoading(true))
        
        await syncStartLista(dispatch)
        await syncCancelLista(dispatch, idMotorista)
        await syncSaveLista(dispatch, idMotorista)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncAll',error)
    }
}