import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function updateSyncValue(key: string, localValues: ValueToSync<any>[], changedValue: any){
    try {
        const newLocalSync = localValues.map(f => {
            if(f.value.toString() === changedValue.toString()) f.sync = true
            return f
        })
        await storage.setItem(key, newLocalSync)
    } catch (error) {
        info.error('updateSyncValue',error)
    }
}