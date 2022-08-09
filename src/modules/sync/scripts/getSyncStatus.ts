import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function getSyncStatus(key: string){
    try {
        const currentSyncStorage = await storage.getItem<ValueToSync<any>[]>(key)
        if(!!currentSyncStorage && currentSyncStorage.length > 0){
            return currentSyncStorage.every(f => f.sync === true)
        }else return true
    } catch (error) {
        info.error('getSyncStatus',error)
        return true
    }
}