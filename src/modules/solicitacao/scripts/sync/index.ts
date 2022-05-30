
import { Coordinates } from "../../../../interfaces/Coordinates"
import { ValueToSync } from "../../../sync/interfaces/ValueToSync"
import { setSyncLoading } from "../../../sync/reducers/syncReducer"
import saveLista from "../requests/requestSaveLista"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"
import updateSyncValue from "../../../sync/scripts/updateSyncValue"
import getSyncStack from "../../../sync/scripts/getSyncStack"
import startReceivingLista from "../requests/requestStartReceivingLista"
import cancelLista from "../requests/requestCancelLista"

export async function syncValuesLista(){
    const synchronizedStartLista = await getSyncStack('syncStartLista')
    const synchronizedSaveLista = await getSyncStack('syncSaveLista')
    const synchronizedCancelLista = await getSyncStack('syncCancelLista')

    return synchronizedStartLista && synchronizedSaveLista && synchronizedCancelLista
}

export async function syncStartLista(dispatch: Function){
    try {
        dispatch(setSyncLoading(true))

        const storageKey = 'syncListaStart'
        const localSyncListaStart = await storage.getItem<ValueToSync<{idLista: number, coords: Coordinates}>[]>(storageKey)
        
        if(!!localSyncListaStart && localSyncListaStart.length > 0){
            info.data("localSyncListaStart", localSyncListaStart)
            localSyncListaStart.filter(f => !f.sync && !f.dtSync).forEach(async ({ value }) => {
                const response = await startReceivingLista(dispatch, () => {}, false, value.idLista, value.coords)
                if(response) await updateSyncValue(storageKey, localSyncListaStart, value)
            })
        }else await storage.removeItem(storageKey)
        
        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncStartLista',error)
    }
}

export async function syncSaveLista(dispatch: Function, idMotorista: number){
    try {
        dispatch(setSyncLoading(true))

        const storageKey = 'syncListaSave'
        const localSyncListaSave = await storage.getItem<ValueToSync<{idLista: number, volumes: number[]}>[]>(storageKey)

        if(!!localSyncListaSave && localSyncListaSave.length > 0){
            info.data("localSyncListaSave", localSyncListaSave)
            localSyncListaSave.filter(f => !f.sync && !f.dtSync).forEach(async ({ value }) => {
                const response = await saveLista(dispatch, () => {}, false, idMotorista, value.idLista, value.volumes)
                if(response) await updateSyncValue(storageKey, localSyncListaSave, value)
            })
        }else await storage.removeItem(storageKey)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncSaveLista',error)
    }
}

export async function syncCancelLista(dispatch: Function, idMotorista: number){
    try {
        dispatch(setSyncLoading(true))

        const storageKey = 'syncListaCancel'
        const localSyncListaCancel = await storage.getItem<ValueToSync<{idLista: number}>[]>(storageKey)

        if(!!localSyncListaCancel && localSyncListaCancel.length > 0){
            info.data("localSyncListaCancel", localSyncListaCancel)
            localSyncListaCancel.filter(f => !f.sync && !f.dtSync).forEach(async ({ value }) => {
                const response = await cancelLista(dispatch, () => {}, false, idMotorista, value.idLista)
                if(response) await updateSyncValue(storageKey, localSyncListaCancel, value)
            })
        }else await storage.removeItem(storageKey)

        dispatch(setSyncLoading(false))
    } catch (error) {
        info.error('syncCancelLista',error)
    }
}