import { SyncCancelLista } from "../../../scripts/sync/types"
import { UserData } from "../../../../../interfaces/UserData"
import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import cancelLista from "../../../scripts/requests/requestCancelLista"
import info from "../../../../../utils/info"

export default async function cancel(dispatch: Function, network: boolean, redirect: () => void, userData: UserData, idLista: number, motivoCancelamento: string){
    try {
        if(network) await cancelLista(dispatch, redirect, false, userData, idLista, motivoCancelamento)
        else{
            await addToSyncStack('syncListaCancel', createValueToSync({idLista, motivoCancelamento} as SyncCancelLista))
            dispatch(updateSituacao({status: 'CANCELADO', idLista}))
            redirect()
        }
    } catch (error) {
        info.error('cancel',error)
    }
}