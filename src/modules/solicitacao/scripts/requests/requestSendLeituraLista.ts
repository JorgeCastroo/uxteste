import { VVLOG_HML_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { showMessage } from "react-native-flash-message"
import { Volume } from "../../interfaces/Volume"
import { UserData } from "../../../../interfaces/UserData"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateListaSituacao } from "../../reducers/lista/listaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function sendLeituraLista(dispatch: Function, redirect: () => void, sync: boolean, userData: UserData, idLista: number, listaVolumes: Volume[]){
    try {
        dispatch(R.setRequestSendLeituraListaLoading())

        const endpoint = `${VVLOG_HML_ENDPOINT}/Lista/FirstMile/MarcarLeitura`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idLista,
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
            listaVolumes,
        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestSendLeituraListaData(response))
            if(!response.flagErro){
                if(!sync){
                    dispatch(updateListaSituacao({status: 'FINALIZADO', idLista}))
                    redirect()
                }
                return true
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('saveLista',error)
        dispatch(R.setRequestSendLeituraListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestSendLeituraListaError())
        if(!sync){
            showMessage({
                message: "Erro ao finalizar lista!",
                description: error.message ?? JSON.stringify(error),
                type: "danger",
                duration: 10000,
                floating: true,
            })
        }
        return false
    }
}