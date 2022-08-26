import { SyncCancelLista, SyncCancelEnderecoLista, SyncSaveLista, SyncSendLista, SyncStartLista, SyncStartEndereco } from "./types"
import { UserData } from "../../../../interfaces/UserData"
import handleSyncStorage from "../../../sync/scripts/handleSyncStorage"
import updateSyncStack from "../../../sync/scripts/updateSyncStack"
import getSyncStatus from "../../../sync/scripts/getSyncStatus"
import syncValue from "../../../sync/scripts/syncValue"
import storage from "../../../../utils/storage"
import info from "../../../../utils/info"
import saveLista from "../requests/requestSaveLista"
import cancelLista from "../requests/requestCancelLista"
import sendLeituraLista from "../requests/requestSendLeituraLista"
import startReceivingLista from "../requests/requestStartReceivingLista"
import cancelEnderecoLista from "../requests/requestCancelEnderecoLista"
import startReceivingEndereco from "../requests/requestStartReceivingEndereco"

export const syncListakeys = ['syncListaStart', 'syncEnderecoStart', 'syncListaSave', 'syncListaSend', 'syncListaCancel', 'syncEnderecoCancel']

export async function syncValuesLista(){
    const storageStatus: any[] = []
 
    await Promise.all(syncListakeys.map(async key => {
        const currentStorageStatus = await getSyncStatus(key)
        storageStatus.push(currentStorageStatus)
    }))
    
    return storageStatus.every(isSync => isSync === true)
}

export async function syncStartLista(dispatch: Function){
    try {
        const { key, items } = await handleSyncStorage<SyncStartLista>('syncListaStart')
        
        if(!!items && items.filter(({ sync }) => !sync).length > 0){
            const syncedValues: SyncStartLista[] = []

            await Promise.all(items.filter(f => !f.sync).map(async ({ value }) => {
                const functionToSync = () => startReceivingLista(dispatch, false, value.idLista, value.idRemetente, value.coords)
                await syncValue(functionToSync, value, syncedValues)
            }))
            await updateSyncStack(key, items, syncedValues)
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncStartLista',error)
    }
}

export async function syncStartEndereco(dispatch: Function){
    try {
        const { key, items } = await handleSyncStorage<SyncStartEndereco>('syncEnderecoStart')

        if(!!items && items.filter(({ sync }) => !sync).length > 0){
            const syncedValues: SyncStartEndereco[] = []

            await Promise.all(items.filter(f => !f.sync).map(async ({ value }) => {
                const functionToSync = () => startReceivingEndereco(dispatch, () => {}, false, value.idLista, value.idRemetente, value.coords)
                await syncValue(functionToSync, value, syncedValues)
            }))
            await updateSyncStack(key, items, syncedValues)
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncStartEndereco',error)
    }
}

export async function syncSaveLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncSaveLista>('syncListaSave')

        if(!!items && items.filter(({ sync }) => !sync).length > 0){
            const syncedValues: SyncSaveLista[] = []

            await Promise.all(items.filter(f => !f.sync).map(async ({ value }) => {
                const functionToSync = () => saveLista(dispatch, () => {}, false, userData, value.idLista, value.volumes)
                await syncValue(functionToSync, value, syncedValues)
            }))
            await updateSyncStack(key, items, syncedValues)
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncSaveLista',error)
    }
}

export async function syncSendLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncSendLista>('syncListaSend')

        if(!!items && items.filter(({ sync }) => !sync).length > 0){
            const syncedValues: SyncSendLista[] = []

            await Promise.all(items.filter(f => !f.sync).map(async ({ value }) => {
                const functionToSync = () => sendLeituraLista(dispatch, () => {}, false, userData, value.idLista, value.idRemetente, value.volumes)
                await syncValue(functionToSync, value, syncedValues)
            }))
            await updateSyncStack(key, items, syncedValues)
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncSendLista',error)
    }
}

export async function syncCancelLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncCancelLista>('syncListaCancel')

        if(!!items && items.filter(({ sync }) => !sync).length > 0){
            const syncedValues: SyncCancelLista[] = []

            await Promise.all(items.filter(f => !f.sync).map(async ({ value }) => {
                const functionToSync = () => cancelLista(dispatch, () => {}, false, userData, value.idLista, value.motivoCancelamento)
                await syncValue(functionToSync, value, syncedValues)
            }))
            await updateSyncStack(key, items, syncedValues)
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncCancelLista',error)
    }
}

export async function syncCancelEnderecoLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncCancelEnderecoLista>('syncEnderecoCancel')

        if(!!items && items.filter(({ sync }) => !sync).length > 0){
            const syncedValues: SyncCancelEnderecoLista[] = []

            await Promise.all(items.filter(f => !f.sync).map(async ({ value }) => {
                const functionToSync = () => cancelEnderecoLista(dispatch, () => {}, false, userData, value.idLista, value.idRemetente)
                await syncValue(functionToSync, value, syncedValues)
            }))
            await updateSyncStack(key, items, syncedValues)
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncCancelEnderecoLista',error)
    }
}