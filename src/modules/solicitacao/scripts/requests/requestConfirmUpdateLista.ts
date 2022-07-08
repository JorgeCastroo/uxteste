import { VVLOG_AUTHORIZATION, VVLOG_ENDPOINT } from "@env"
import { ListaConfirmada } from "../../interfaces/ListaConfirmada"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function confirmUpdateLista(dispatch: Function, listaAtualizados: ListaConfirmada[]){
    try {
        dispatch(R.setRequestConfirmUpdateListaLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/ConfirmarRecebimento`
        const authorization = VVLOG_AUTHORIZATION
        const body = { listaAtualizados }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestConfirmUpdateListaData(response))
            if(response.flagErro) throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('confirmUpdateLista',error)
        dispatch(R.setRequestConfirmUpdateListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestConfirmUpdateListaError())
    }
}