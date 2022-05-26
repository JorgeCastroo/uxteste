import { ValueToSync } from "../interfaces/ValueToSync"
import { setSyncLoading } from "../reducers/syncReducer"
import updateSyncValue from "./updateSyncValue"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function syncValue(dispatch: Function, key: string){
    try {
        dispatch(setSyncLoading(true))

        const localData = await storage.getItem<ValueToSync<any>[]>(key)

        if(!!localData && localData.length > 0){
            localData.filter(f => !f.sync).forEach(async ({ value }) => {
                await (async () => {})() // Custom function
                await updateSyncValue(key, localData, value)
            })
        }else await storage.removeItem(key)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncValue',error)
    }
}