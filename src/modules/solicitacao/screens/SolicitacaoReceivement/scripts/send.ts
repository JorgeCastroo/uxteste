import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import saveLista from "../../../scripts/requests/requestSaveLista"
import info from "../../../../../utils/info"

export default async function send(dispatch: Function, network: boolean, redirect: () => void, openSuccess: () => void, idMotorista: number, idLista: number, idRemetente: number, volumes: number[]){
    try {
        if(network) await saveLista(dispatch, openSuccess, false, idMotorista, idLista, idRemetente, volumes)
        else{
            await addToSyncStack('syncListaSave', createValueToSync({idLista, idRemetente, volumes}))
            dispatch(updateSituacao({status: 'FINALIZADO', idRemetente}))
            redirect()
        }
    } catch (error) {
        info.error('send',error)
    }
}