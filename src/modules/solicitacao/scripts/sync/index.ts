
import { Coordinates } from "../../../../interfaces/Coordinates"
import { ValueToSync } from "../../../sync/interfaces/ValueToSync"
import updateSyncValue from "../../../sync/scripts/updateSyncValue"
import getSyncStack from "../../../sync/scripts/getSyncStack"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"
import startReceivingLista from "../requests/requestStartReceivingLista"
import saveLista from "../requests/requestSaveLista"
import cancelLista from "../requests/requestCancelLista"

export async function syncValuesLista(){
    const synchronizedStartLista = await getSyncStack('syncStartLista')
    const synchronizedSaveLista = await getSyncStack('syncSaveLista')
    const synchronizedCancelLista = await getSyncStack('syncCancelLista')

    return synchronizedStartLista && synchronizedSaveLista && synchronizedCancelLista
}

export async function syncStartLista(dispatch: Function){
    try {
        const storageKey = 'syncListaStart'
        const localSyncListaStart = await storage.getItem<ValueToSync<{idLista: number, idRemetente: number, coords: Coordinates}>[]>(storageKey)
        
        if(!!localSyncListaStart && localSyncListaStart.length > 0){
            localSyncListaStart.filter(f => !f.sync && !f.dtSync).forEach(async ({ value }) => {
                const response = await startReceivingLista(dispatch, () => {}, false, value.idLista, value.idRemetente, value.coords)
                if(response) await updateSyncValue(storageKey, localSyncListaStart, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncStartLista',error)
    }
}

export async function syncSaveLista(dispatch: Function, idMotorista: number){
    try {
        const storageKey = 'syncListaSave'
        const localSyncListaSave = await storage.getItem<ValueToSync<{idLista: number, idRemetente: number, volumes: number[]}>[]>(storageKey)

        if(!!localSyncListaSave && localSyncListaSave.length > 0){
            localSyncListaSave.filter(f => !f.sync && !f.dtSync).forEach(async ({ value }) => {
                const response = await saveLista(dispatch, () => {}, false, idMotorista, value.idLista, value.idRemetente, value.volumes)
                if(response) await updateSyncValue(storageKey, localSyncListaSave, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncSaveLista',error)
    }
}

export async function syncCancelLista(dispatch: Function, idMotorista: number){
    try {
        const storageKey = 'syncListaCancel'
        const localSyncListaCancel = await storage.getItem<ValueToSync<{idLista: number, idRemetente: number, motivoCancelamento: string}>[]>(storageKey)

        if(!!localSyncListaCancel && localSyncListaCancel.length > 0){
            localSyncListaCancel.filter(f => !f.sync && !f.dtSync).forEach(async ({ value }) => {
                const response = await cancelLista(dispatch, () => {}, false, idMotorista, value.idLista, value.idRemetente, value.motivoCancelamento)
                if(response) await updateSyncValue(storageKey, localSyncListaCancel, value)
            })
        }else await storage.removeItem(storageKey)
    } catch (error) {
        info.error('syncCancelLista',error)
    }
}