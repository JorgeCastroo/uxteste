import { VVLOG_HML_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { Lista } from "../../interfaces/Lista"
import { UserData } from "../../../../interfaces/UserData"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"
import { idStatusLista } from "../../../../constants/idStatusLista"

export default async function getLista(dispatch: Function, userData: UserData){
    try {
        dispatch(R.setRequestGetListaLoading())

        const endpoint = `${VVLOG_HML_ENDPOINT}/Lista/FirstMile/ListarRomaneio`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
            idStatusLista: idStatusLista['APROVADO'],
        }
        const response = await request.post<ResponsePattern<Lista[]>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestGetListaData(response))
            if(!response.flagErro) return response.listaResultados
            else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getLista',error)
        dispatch(R.setRequestGetListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestGetListaError())
        return null
    }
}