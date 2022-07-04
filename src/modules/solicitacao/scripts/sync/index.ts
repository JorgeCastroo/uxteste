import { SyncCancelLista, SyncCancelEnderecoLista, SyncSaveLista, SyncSendLista, SyncStartLista } from "./types"
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

export async function syncValuesLista(){
    const synchronizedStartLista = await getSyncStatus('syncStartLista')
    const synchronizedSaveLista = await getSyncStatus('syncSaveLista')
    const synchronizedCancelLista = await getSyncStatus('syncCancelLista')
    const synchronizedSendLista = await getSyncStatus('syncListaSend')

    return synchronizedStartLista && synchronizedSaveLista && synchronizedCancelLista && synchronizedSendLista
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

export async function syncSendLista(dispatch: Function, userData: UserData){
    try {
        const storageKey = 'syncListaSend'
        const storageItems = await getSyncStorage<SyncSendLista>(storageKey)

        if(!!storageItems && storageItems.length > 0){
            storageItems.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await sendLeituraLista(dispatch, () => {}, false, userData, value.idLista, value.volumes)
                if(response) await updateSyncValue(storageKey, storageItems, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncSendLista',error)
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

export async function syncCancelEnderecoLista(dispatch: Function, userData: UserData){
    try {
        const storageKey = 'syncListaCancelEndereco'
        const storageItems = await getSyncStorage<SyncCancelEnderecoLista>(storageKey)

        if(!!storageItems && storageItems.length > 0){
            storageItems.filter(f => !f.sync).forEach(async ({ value }) => {
                const response = await cancelEnderecoLista(dispatch, () => {}, false, userData, value.idLista, value.idRemetente)
                if(response) await updateSyncValue(storageKey, storageItems, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncCancelEnderecoLista',error)
    }
}