import { syncListakeys } from "../../solicitacao/scripts/sync"
import storage from "../../../utils/storage"
import info from "../../../utils/info"

export default async function clearAllSyncStacks(){
    try {
        const syncKeys = [...syncListakeys]
        await Promise.all(syncKeys.map(async key => {
            await storage.removeItem(key)
        }))
    } catch (error) {
        info.error('clearAllSyncStacks',error)
    }
}