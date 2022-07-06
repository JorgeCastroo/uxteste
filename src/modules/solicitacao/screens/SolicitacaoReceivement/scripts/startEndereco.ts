import { SyncStartEndereco } from "../../../scripts/sync/types"
import { Coordinates } from "../../../../../interfaces/Coordinates"
import { updateEnderecoSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import startReceivingEndereco from "../../../scripts/requests/requestStartReceinvingEndereco"
import info from "../../../../../utils/info"

export default async function startEndereco(dispatch: Function, network: boolean, redirect: () => void, idLista: number, idRemetente: number, coords: Coordinates){
    try {
        if(network) startReceivingEndereco(dispatch, redirect, false, idLista, idRemetente, coords)
        else{
            await addToSyncStack('syncEnderecoStart', createValueToSync({idLista, idRemetente, coords} as SyncStartEndereco))
            dispatch(updateEnderecoSituacao({status: 'COLETANDO', idLista, idRemetente}))
            redirect()
        }
    } catch (error) {
        info.error('startEndereco',error)
    }
}