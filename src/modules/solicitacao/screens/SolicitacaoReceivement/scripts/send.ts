import { updateSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import saveLista from "../../../scripts/requests/requestSaveLista"
import info from "../../../../../utils/info"

export default async function send(dispatch: Function, network: boolean, redirect: () => void, volumes: number[]){
    try {
        if(network) await saveLista(dispatch, redirect, true, volumes)
        else{
            await addToSyncStack('syncListaSave', createValueToSync(volumes))
            dispatch(updateSituacao('FINALIZADO'))
            redirect()
        }
    } catch (error) {
        info.error('send',error)
    }
}