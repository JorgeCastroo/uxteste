import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function addToSyncStack<T>(key: string, value: ValueToSync<T>){
    try {
        const currentSyncStorage = await storage.getItem<any>(key)
        if(!!currentSyncStorage){
            if(!currentSyncStorage.includes(value)) await storage.setItem(key, [...currentSyncStorage, value] as ValueToSync<T>[])
        }else await storage.setItem(key, [value])
    } catch (error) {
        info.error('addToSyncStack',error)
    }
}