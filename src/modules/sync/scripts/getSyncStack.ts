import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function getSyncStack(key: string){
    try {
        const currentSyncStorage = await storage.getItem<ValueToSync<any>[]>(key)
        if(!!currentSyncStorage && currentSyncStorage.length > 0){
            if(currentSyncStorage.every(f => f.sync)) return true
            else return false
        }else return true
    } catch (error) {
        info.error('getSyncStack',error)
        return false
    }
}