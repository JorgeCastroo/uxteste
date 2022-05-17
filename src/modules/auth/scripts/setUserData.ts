import { UserData } from "../../../interfaces/UserData"
import { setAuthLogin, setAuthUserData } from "../reducers/authReducer"
import storage from "../../../utils/storage"
import info from "../../../utils/info"

export default async function setUserData(dispatch: Function, userData: UserData, setLogin?: boolean){
    try {
        await storage.setItem('userData', userData)
        dispatch(setAuthUserData(userData))
        if(setLogin === true) dispatch(setAuthLogin())
    } catch (error) {
        info.error('setUserData', error)
    }
}