import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"
import isoDateTime from "../../../utils/isoDateTime"

export default async function updateSyncStack<T>(key: string, localValues: ValueToSync<T>[], changedValues: T[]){
    try {
        const newSyncLocal = localValues.map(localValue => {
            const changedValue = changedValues.find(changedValue => (localValue.value as any).toString() === (changedValue as any).toString())
            if(changedValue){
                localValue.sync = true
                localValue.dtSync = isoDateTime()
            }
            return localValue
        })
        await storage.setItem(key, newSyncLocal)
    } catch (error) {
        info.error('updateSyncStack',error)
    }
}