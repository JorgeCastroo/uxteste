import { ValueToSync } from "../interfaces/ValueToSync"
import updateSyncValue from "./updateSyncValue"
import info from "../../../utils/info"

export default async function syncValue<T>(functionToSync: () => Promise<boolean>, storageKey: string, storageItems: ValueToSync<T>[], value: T){
    try {
        const response = await functionToSync()
        if(response) await updateSyncValue(storageKey, storageItems, value)
    } catch (error) {
        info.error('syncValue',error)
    }
}