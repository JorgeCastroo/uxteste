import { UserData } from "../../../interfaces/UserData"
import { setSyncLoading } from "../reducers/syncReducer"
import { syncCancelEnderecoLista, syncCancelLista, syncSaveLista, syncSendLista, syncStartEndereco, syncStartLista } from "../../solicitacao/scripts/sync"
import info from "../../../utils/info"

export default async function syncAll(dispatch: Function, userData: UserData){
    try {
        dispatch(setSyncLoading(true))
        
        await syncStartLista(dispatch)
        await syncStartEndereco(dispatch)
        await syncSendLista(dispatch, userData)
        await syncSaveLista(dispatch, userData)
        await syncCancelEnderecoLista(dispatch, userData)
        await syncCancelLista(dispatch, userData)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncAll',error)
    }
}