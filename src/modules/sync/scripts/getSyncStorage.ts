import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function getSyncStorage<T>(key: string){
    try {
        const storageValues = await storage.getItem<ValueToSync<T>[]>(key)
        
        if(!!storageValues && storageValues.length > 0) return storageValues
        else return null
    } catch (error) {
        info.error('getSyncStorage',error)
        return null
    }
}