import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import cancelLista from "../../../scripts/requests/requestCancelLista"
import info from "../../../../../utils/info"

export default async function cancel(dispatch: Function, network: boolean, redirect: () => void, idMotorista: number, idLista: number){
    try {
        dispatch(updateSituacao({status: 'CANCELADO', idLista}))
            redirect()
        /*
        if(network) await cancelLista(dispatch, redirect, false, idMotorista, idLista)
        else{
            await addToSyncStack('syncListaCancel', createValueToSync({idLista}))
            dispatch(updateSituacao({status: 'CANCELADO', idLista}))
            redirect()
        }
        */
    } catch (error) {
        info.error('cancelLista',error)
    }
}