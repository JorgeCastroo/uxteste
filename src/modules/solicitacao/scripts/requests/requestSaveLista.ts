import { TRUX_ENDPOINT } from "@env"
import { UserData } from "../../../../interfaces/UserData"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateSituacao } from "../../reducers/lista/listaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function saveLista(dispatch: Function, redirect: () => void, sync: boolean, userData: UserData, idLista: number, listaVolumes: number[]){
    try {
        dispatch(R.setRequestSaveListaLoading())

        const endpoint = `${TRUX_ENDPOINT}/Lista/FirstMile/ConcluirRecebimento`
        const authorization = 'basic mc0}fn7)za6#'
        const body = {
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
            listaVolumes,
        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response){
            dispatch(R.setRequestSaveListaData(response))
            if(!response.flagErro){
                if(!sync){
                    dispatch(updateSituacao({status: 'FINALIZADO', idLista}))
                    redirect()
                }
                return true
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('saveLista',error)
        dispatch(R.setRequestSaveListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestSaveListaError())
        return false
    }
}