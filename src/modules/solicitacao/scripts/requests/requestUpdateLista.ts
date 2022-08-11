import { VVLOG_AUTHORIZATION, VVLOG_ENDPOINT } from "@env"
import { showMessage } from "react-native-flash-message"
import { UserData } from "../../../../interfaces/UserData"
import { Endereco } from "../../interfaces/Lista"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateListas } from "../../reducers/lista/listaReducer"
import createListaConfirmada from "../createListaConfirmada"
import confirmUpdateLista from "./requestConfirmUpdateLista"
import request from "../../../../utils/request"
import info from "../../../../utils/info"
import MOCK_LISTA_UPDATE from "../../../../mock/listaUpdate"

export default async function updateLista(dispatch: Function, userData: UserData){
    try {
        //dispatch(updateListas(MOCK_LISTA_UPDATE))
        dispatch(R.setRequestUpdateListaLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/AdicionarNovoSeller`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
        }
        const response = await request.post<ResponsePattern<Endereco[]>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestUpdateListaData(response))
            if(!response.flagErro){
                if(response.listaResultados.length > 0){             
                    dispatch(updateListas(response.listaResultados))
                    showMessage({
                        message: "Novos endereços foram adicionados!",
                        type: "success",
                        duration: 5000,
                        floating: true,
                    })
                    confirmUpdateLista(dispatch, createListaConfirmada(response.listaResultados))
                }
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('updateLista',error)
        dispatch(R.setRequestUpdateListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestUpdateListaError())
    }
}