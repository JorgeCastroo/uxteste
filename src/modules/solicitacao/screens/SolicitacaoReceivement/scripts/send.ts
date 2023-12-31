import { Volume } from "../../../interfaces/Volume"
import { SyncSendLista } from "../../../scripts/sync/types"
import { UserData } from "../../../../../interfaces/UserData"
import { updateEnderecoSituacao } from "../../../reducers/lista/listaReducer"
import addToSyncStack from "../../../../sync/scripts/addToSyncStack"
import createValueToSync from "../../../../sync/scripts/createValueToSync"
import sendLeituraLista from "../../../scripts/requests/requestSendLeituraLista"
import info from "../../../../../utils/info"

export default async function send(dispatch: Function, network: boolean, redirect: () => void, openSuccess: () => void, userData: UserData, idLista: number, idRemetente: number, volumes: Volume[]){
    try {
        if(network) await sendLeituraLista(dispatch, openSuccess, false, userData, idLista, idRemetente, volumes)
        else{
            await addToSyncStack('syncListaSend', createValueToSync({idLista, idRemetente, volumes} as SyncSendLista))
            dispatch(updateEnderecoSituacao({status: 'FINALIZADO', idLista, idRemetente}))
            redirect()
        }
    } catch (error) {
        info.error('send',error)
    }
}