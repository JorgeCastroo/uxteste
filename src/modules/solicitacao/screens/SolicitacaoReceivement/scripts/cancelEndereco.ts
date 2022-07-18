import { UserData } from "../../../../../interfaces/UserData"
import { SyncCancelEnderecoLista } from "../../../scripts/sync/types"
import { updateEnderecoSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import cancelEnderecoLista from "../../../scripts/requests/requestCancelEnderecoLista"
import info from "../../../../../utils/info"

export default async function cancelEndereco(dispatch: Function, network: boolean, redirect: () => void, userData: UserData, idLista: number, idRemetente: number){
    try {
        if(network) await cancelEnderecoLista(dispatch, redirect, false, userData, idLista, idRemetente)
        else{
            await addToSyncStack('syncEnderecoCancel', createValueToSync({idLista, idRemetente} as SyncCancelEnderecoLista))
            dispatch(updateEnderecoSituacao({status: 'CANCELADO', idLista, idRemetente}))
            redirect()
        }
    } catch (error) {
        info.error('cancel',error)
    }
}