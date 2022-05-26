import { setAuthLogout } from "../reducers/authReducer"
import info from "../../../utils/info"
import storage from "../../../utils/storage"
import closeLista from "../../solicitacao/scripts/closeLista"

export default async function setUserLogout(dispatch: Function, returnHome: () => void){
    try {
        await storage.removeItem('userData')
        await closeLista(dispatch)
        dispatch(setAuthLogout())
        returnHome()
    } catch (error) {
        info.error('setLogout', error)
    }
}