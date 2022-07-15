import { VVLOG_AUTHORIZATION, VVLOG_ENDPOINT } from "@env"
import { UserData } from "../../../../interfaces/UserData"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import removeLista from "../removeLista"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function closeLista(dispatch: Function, userData: UserData){
    try {
        dispatch(R.setRequestCloseListaLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/FecharLista`
        const authorization = VVLOG_AUTHORIZATION
        const body = {}
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestCloseListaData(response))
            if(!response.flagErro) await removeLista(dispatch)
            else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('closeLista',error)
        dispatch(R.setRequestCloseListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestCloseListaError())
    }
}