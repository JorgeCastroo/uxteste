import { setAuthLogout } from "../reducers/authReducer"
import clearAllSyncStacks from "../../sync/scripts/clearAllSyncStacks"
import closeLista from "../../solicitacao/scripts/closeLista"
import info from "../../../utils/info"
import storage from "../../../utils/storage"
import OneSignal from "react-native-onesignal"

export default async function setUserLogout(dispatch: Function, returnHome: () => void){
    try {
        await closeLista(dispatch)
        await clearAllSyncStacks()
        
        await storage.removeItem('userData')

        dispatch(setAuthLogout())

        OneSignal.deleteTag("user");
        OneSignal.removeExternalUserId();
        
        returnHome()
    } catch (error) {
        info.error('setLogout', error)
    }
}