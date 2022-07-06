import { SyncCancelLista, SyncCancelEnderecoLista, SyncSaveLista, SyncSendLista, SyncStartLista, SyncStartEndereco } from "./types"
import { UserData } from "../../../../interfaces/UserData"
import updateSyncValue from "../../../sync/scripts/updateSyncValue"
import getSyncStorage from "../../../sync/scripts/getSyncStorage"
import getSyncStatus from "../../../sync/scripts/getSyncStatus"
import storage from "../../../../utils/storage"
import info from "../../../../utils/info"
import saveLista from "../requests/requestSaveLista"
import cancelLista from "../requests/requestCancelLista"
import sendLeituraLista from "../requests/requestSendLeituraLista"
import startReceivingLista from "../requests/requestStartReceivingLista"
import cancelEnderecoLista from "../requests/requestCancelEnderecoLista"
import startReceivingEndereco from "../requests/requestStartReceinvingEndereco"
import handleSyncStorage from "../../../sync/scripts/handleSyncStorage"

export const syncListakeys = ['syncListaStart', 'syncEnderecoStart', 'syncListaSave', 'syncListaSend', 'syncListaCancel', 'syncEnderecoCancel']

export async function syncValuesLista(){
    let storageStatus: boolean[] = []

    syncListakeys.forEach(async key => {
        const currentStorageStatus = await getSyncStatus(key)
        storageStatus.push(currentStorageStatus)
    })

    return storageStatus.every(isSync => isSync === true)
}

export async function syncStartLista(dispatch: Function){
    try {
        const { key, items } = await handleSyncStorage<SyncStartLista>('syncListaStart')
        
        if(!!items && items.length > 0){
            items.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await startReceivingLista(dispatch, () => {}, false, value.idLista, value.coords)
                if(response) await updateSyncValue(key, items, value)
            })
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncStartLista',error)
    }
}

export async function syncStartEndereco(dispatch: Function){
    try {
        const { key, items } = await handleSyncStorage<SyncStartEndereco>('syncEnderecoStart')

        if(!!items && items.length > 0){
            items.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await startReceivingEndereco(dispatch, () => {}, false, value.idLista, value.idRemetente, value.coords)
                if(response) await updateSyncValue(key, items, value)
            })
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncStartEndereco',error)
    }
}

export async function syncSaveLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncSaveLista>('syncListaSave')

        if(!!items && items.length > 0){
            items.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await saveLista(dispatch, () => {}, false, userData, value.idLista, value.volumes)
                if(response) await updateSyncValue(key, items, value)
            })
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncSaveLista',error)
    }
}

export async function syncSendLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncSendLista>('syncListaSend')

        if(!!items && items.length > 0){
            items.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await sendLeituraLista(dispatch, () => {}, false, userData, value.idLista, value.idRemetente, value.volumes)
                if(response) await updateSyncValue(key, items, value)
            })
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncSendLista',error)
    }
}

export async function syncCancelLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncCancelLista>('syncListaCancel')

        if(!!items && items.length > 0){
            items.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await cancelLista(dispatch, () => {}, false, userData, value.idLista, value.motivoCancelamento)
                if(response) await updateSyncValue(key, items, value)
            })
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncCancelLista',error)
    }
}

export async function syncCancelEnderecoLista(dispatch: Function, userData: UserData){
    try {
        const { key, items } = await handleSyncStorage<SyncCancelEnderecoLista>('syncEnderecoCancel')

        if(!!items && items.length > 0){
            items.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await cancelEnderecoLista(dispatch, () => {}, false, userData, value.idLista, value.idRemetente)
                if(response) await updateSyncValue(key, items, value)
            })
        }else await storage.removeItem(key)
    } catch (error) {
        info.error('syncCancelEnderecoLista',error)
    }
}