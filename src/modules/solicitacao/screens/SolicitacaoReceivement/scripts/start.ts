import { SyncStartLista } from "../../../scripts/sync/types"
import { Coordinates } from "../../../../../interfaces/Coordinates"
import { updateListaSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import startReceivingLista from "../../../scripts/requests/requestStartReceivingLista"
import info from "../../../../../utils/info"

export default async function start(dispatch: Function, network: boolean, idLista: number, idRemetente: number, coords: Coordinates){
    try {
        if(network) startReceivingLista(dispatch, false, idLista, idRemetente, coords)
        else{
            await addToSyncStack('syncListaStart', createValueToSync({idLista, idRemetente, coords} as SyncStartLista))
            dispatch(updateListaSituacao({status: 'COLETANDO', idLista}))
        }
    } catch (error) {
        info.error('start',error)
    }
}