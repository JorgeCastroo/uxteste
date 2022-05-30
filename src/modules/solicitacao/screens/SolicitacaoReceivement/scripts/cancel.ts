import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import cancelLista from "../../../scripts/requests/requestCancelLista"
import info from "../../../../../utils/info"

export default async function cancel(dispatch: Function, network: boolean, redirect: () => void, idMotorista: number, idLista: number, idRemetente: number, motivoCancelamento: string){
    try {
        if(network) await cancelLista(dispatch, redirect, false, idMotorista, idLista, idRemetente, motivoCancelamento)
        else{
            await addToSyncStack('syncListaCancel', createValueToSync({idLista, idRemetente, motivoCancelamento}))
            dispatch(updateSituacao({status: 'CANCELADO', idRemetente}))
            redirect()
        }
    } catch (error) {
        info.error('cancel',error)
    }
}