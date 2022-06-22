import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function clearAllSyncStacks(){
    try {
        await storage.removeItem('syncListaSave')
        await storage.removeItem('syncListaStart')
        await storage.removeItem('syncListaCancel')
    } catch (error) {
        info.error('clearAllSyncStacks',error)
    }
}