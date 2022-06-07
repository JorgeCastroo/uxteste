import { UserData } from "../../../../../interfaces/UserData"
import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import saveLista from "../../../scripts/requests/requestSaveLista"
import info from "../../../../../utils/info"

export default async function send(dispatch: Function, network: boolean, redirect: () => void, openSuccess: () => void, userData: UserData, idLista: number, volumes: number[]){
    try {
        if(network) await saveLista(dispatch, openSuccess, false, userData, idLista, volumes)
        else{
            await addToSyncStack('syncListaSave', createValueToSync({idLista, volumes}))
            dispatch(updateSituacao({status: 'FINALIZADO', idLista}))
            redirect()
        }
    } catch (error) {
        info.error('send',error)
    }
}