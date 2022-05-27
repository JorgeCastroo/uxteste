import { setAuthLogout } from "../reducers/authReducer"
import clearAllSyncStacks from "../../sync/scripts/clearAllSyncStacks"
import closeLista from "../../solicitacao/scripts/closeLista"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function setUserLogout(dispatch: Function, returnHome: () => void){
    try {
        await storage.removeItem('userData')
        await closeLista(dispatch)
        await clearAllSyncStacks()
        dispatch(setAuthLogout())
        returnHome()
    } catch (error) {
        info.error('setLogout', error)
    }
}