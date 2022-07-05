import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function clearAllSyncStacks(){
    try {
        const syncKeys = ['syncListaSave', 'syncListaStart', 'syncListaCancel', 'syncListaSend', 'syncListaCancelEndereco']
        syncKeys.forEach(async key => { await storage.removeItem(key) })
    } catch (error) {
        info.error('clearAllSyncStacks',error)
    }
}