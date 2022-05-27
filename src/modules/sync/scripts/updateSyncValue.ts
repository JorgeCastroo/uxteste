import { ValueToSync } from "../interfaces/ValueToSync"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function updateSyncValue<T>(key: string, localValues: ValueToSync<T>[], changedValue: T){
    try {
        if(localValues && localValues.length > 0){
            const newLocalSync = localValues.map(f => {
                if((f.value as any).toString() === (changedValue as any).toString()){
                    f.sync = true
                    f.dtSync = new Date().toISOString()
                }
                return f
            })
            await storage.setItem(key, newLocalSync)
        }
    } catch (error) {
        info.error('updateSyncValue',error)
    }
}