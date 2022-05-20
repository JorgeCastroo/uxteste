import { UserData } from "../../../interfaces/UserData"
import info from "../../../utils/info"
import storage from "../../../utils/storage"
import setUserData from "./setUserData"

export default async function getUserData(dispatch: Function){
    try {
        const localUser = await storage.getItem<UserData>('userData')
        if(!!localUser) await setUserData(dispatch, localUser, true)
    } catch (error: any) {
        info.error('getUserData',error)
    }
}