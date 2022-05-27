
import { ValueToSync } from "../../sync/interfaces/ValueToSync"
import { setSyncLoading } from "../../sync/reducers/syncReducer"
import saveLista from "./requests/requestSaveLista"
import info from "../../../utils/info"
import storage from "../../../utils/storage"
import updateSyncValue from "../../sync/scripts/updateSyncValue"

export async function syncSaveLista(dispatch: Function){
    try {
        dispatch(setSyncLoading(true))

        const storageKey = 'syncListaSave'
        const localSyncListaSave = await storage.getItem<ValueToSync<number[]>[]>(storageKey)

        if(!!localSyncListaSave && localSyncListaSave.length > 0){
            localSyncListaSave.filter(f => !f.sync).forEach(async ({ value }) => {
                await saveLista(dispatch, () => {}, false, value)
                await updateSyncValue(storageKey, localSyncListaSave, value)
            })
        }else await storage.removeItem(storageKey)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncSaveLista',error)
    }
}