import { SyncCancelLista, SyncSaveLista, SyncStartLista } from "./types"
import { UserData } from "../../../../interfaces/UserData"
import updateSyncValue from "../../../sync/scripts/updateSyncValue"
import getSyncStatus from "../../../sync/scripts/getSyncStatus"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"
import startReceivingLista from "../requests/requestStartReceivingLista"
import saveLista from "../requests/requestSaveLista"
import cancelLista from "../requests/requestCancelLista"
import getSyncStorage from "../../../sync/scripts/getSyncStorage"

export async function syncValuesLista(){
    const synchronizedStartLista = await getSyncStatus('syncStartLista')
    const synchronizedSaveLista = await getSyncStatus('syncSaveLista')
    const synchronizedCancelLista = await getSyncStatus('syncCancelLista')

    return synchronizedStartLista && synchronizedSaveLista && synchronizedCancelLista
}

export async function syncStartLista(dispatch: Function){
    try {
        const storageKey = 'syncListaStart'
        const storageItems = await getSyncStorage<SyncStartLista>(storageKey)
        
        if(!!storageItems && storageItems.length > 0){
            storageItems.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await startReceivingLista(dispatch, () => {}, false, value.idLista, value.coords)
                if(response) await updateSyncValue(storageKey, storageItems, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncStartLista',error)
    }
}

export async function syncSaveLista(dispatch: Function, userData: UserData){
    try {
        const storageKey = 'syncListaSave'
        const storageItems = await getSyncStorage<SyncSaveLista>(storageKey)

        if(!!storageItems && storageItems.length > 0){
            storageItems.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await saveLista(dispatch, () => {}, false, userData, value.idLista, value.volumes)
                if(response) await updateSyncValue(storageKey, storageItems, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncSaveLista',error)
    }
}

export async function syncCancelLista(dispatch: Function, userData: UserData){
    try {
        const storageKey = 'syncListaCancel'
        const storageItems = await getSyncStorage<SyncCancelLista>(storageKey)

        if(!!storageItems && storageItems.length > 0){
            storageItems.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await cancelLista(dispatch, () => {}, false, userData, value.idLista, value.motivoCancelamento)
                if(response) await updateSyncValue(storageKey, storageItems, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncCancelLista',error)
    }
}