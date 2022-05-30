import { Coordinates } from "../../../../../interfaces/Coordinates"
import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import startReceivingLista from "../../../scripts/requests/requestStartReceivingLista"
import info from "../../../../../utils/info"

export default async function start(dispatch: Function, network: boolean, redirect: () => void, idLista: number, idRemetente: number, coords: Coordinates){
    try {
        if(network) startReceivingLista(dispatch, redirect, false, idLista, idRemetente, coords)
        else{
            await addToSyncStack('syncListaStart', createValueToSync({idLista, idRemetente, coords}))
            dispatch(updateSituacao({status: 'COLETANDO', idRemetente}))
            redirect()
        }
    } catch (error) {
        info.error('start',error)
    }
}