import { SyncStartLista } from "../../../scripts/sync/types"
import { Coordinates } from "../../../../../interfaces/Coordinates"
import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import startReceivingLista from "../../../scripts/requests/requestStartReceivingLista"
import info from "../../../../../utils/info"

export default async function start(dispatch: Function, network: boolean, redirect: () => void, idLista: number, coords: Coordinates){
    try {
        if(network) startReceivingLista(dispatch, redirect, false, idLista, coords)
        else{
            await addToSyncStack('syncListaStart', createValueToSync({idLista, coords} as SyncStartLista))
            dispatch(updateSituacao({status: 'COLETANDO', idLista}))
            redirect()
        }
    } catch (error) {
        info.error('start',error)
    }
}