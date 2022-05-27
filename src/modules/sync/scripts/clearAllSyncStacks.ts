import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function clearAllSyncStacks(){
    try {
        await storage.removeItem('syncListaSave')
        await storage.removeItem('syncListaStart')
    } catch (error) {
        info.error('clearAllSyncStacks',error)
    }
}