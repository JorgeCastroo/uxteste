import { setAuthLogout } from "../reducers/authReducer"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function setUserLogout(dispatch: Function){
    try {
        await storage.removeItem('userData')
        dispatch(setAuthLogout())
    } catch (error) {
        info.error('setLogout', error)
    }
}