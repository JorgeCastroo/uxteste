import { setAuthLogout } from "../reducers/authReducer"
import clearAllSyncStacks from "../../sync/scripts/clearAllSyncStacks"
import closeLista from "../../solicitacao/scripts/removeLista"
import closePushNotifications from "../../app/scripts/pushNotification/closePushNotifications"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function setUserLogout(dispatch: Function, returnHome: () => void){
    try {
        await storage.clear()
        await clearAllSyncStacks()
        await closeLista(dispatch)
        
        closePushNotifications()

        dispatch(setAuthLogout())
        returnHome()
    } catch (error) {
        info.error('setLogout', error)
    }
}