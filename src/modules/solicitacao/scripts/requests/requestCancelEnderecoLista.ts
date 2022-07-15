import { VVLOG_HML_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { showMessage } from "react-native-flash-message"
import { UserData } from "../../../../interfaces/UserData"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateEnderecoSituacao } from "../../reducers/lista/listaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function cancelEnderecoLista(dispatch: Function, redirect: () => void, sync: boolean, userData: UserData, idLista: number, idRemetente: number){
    try {
        dispatch(R.setRequestCancelEnderecoListaLoading())

        const endpoint = `${VVLOG_HML_ENDPOINT}/Lista/FirstMile/MarcarLeitura`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idLista,
            idRemetente,
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
            listaVolumes: [],
        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestCancelEnderecoListaData(response))
            if(!response.flagErro){
                if(!sync){
                    dispatch(updateEnderecoSituacao({status: 'CANCELADO', idLista, idRemetente}))
                    redirect()
                }
                return true
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('saveLista',error)
        dispatch(R.setRequestCancelEnderecoListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestCancelEnderecoListaError())
        if(!sync){
            showMessage({
                message: "Erro ao cancelar endereço!",
                description: error.message ?? JSON.stringify(error),
                type: "danger",
                duration: 10000,
                floating: true,
            })
        }
        return false
    }
}