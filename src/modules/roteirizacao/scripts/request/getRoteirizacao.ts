import { ROTEIRIZACAO_ENDPOINT, ROTEIRIZACAO_KEY } from "@env"
import { RoteirizacaoPayload } from "../../../../interfaces/Roteirizacao"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/requestRoteirizacaoReducer"
import localSetRoteirizacao from "../local/localSetRoteirizacao"
import info from "../../../../utils/info"
import request from "../../../../utils/request"

export default async function getRoteirizacao(dispatch: Function, body: RoteirizacaoPayload){
    try {
        dispatch(R.setRequestGetRoteirizacaoLoading())

        const endpoint = ROTEIRIZACAO_ENDPOINT!
        const authorization = ROTEIRIZACAO_KEY!
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response){
            dispatch(R.setRequestGetRoteirizacaoData(response))
            if(!response.flagErro) await localSetRoteirizacao(dispatch, response.listaResultados[0])
            else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getRoteirizacao',error)
        dispatch(R.setRequestGetRoteirizacaoMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestGetRoteirizacaoError())
    }
}