import { UserData } from "../../../interfaces/UserData"
import { setSyncLoading } from "../reducers/syncReducer"
import { syncCancelLista, syncSaveLista, syncSendLista, syncStartLista } from "../../solicitacao/scripts/sync"
import info from "../../../utils/info"

export default async function syncAll(dispatch: Function, userData: UserData){
    try {
        dispatch(setSyncLoading(true))
        
        await syncStartLista(dispatch)
        await syncCancelLista(dispatch, userData)
        await syncSendLista(dispatch, userData)
        await syncSaveLista(dispatch, userData)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncAll',error)
    }
}