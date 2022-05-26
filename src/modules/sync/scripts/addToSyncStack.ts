import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function addToSyncStack<T>(key: string, value: ValueToSync<T>){
    try {
        const currentSyncStorage = await storage.getItem<any>(key)
        if(!!currentSyncStorage && !currentSyncStorage.includes(value)){
            info.log('addToSyncStack',`Adding ${value} to ${key}`)
            await storage.setItem(key, [...currentSyncStorage, value])
        }
    } catch (error) {
        info.error('addToSyncStack',error)
    }
}