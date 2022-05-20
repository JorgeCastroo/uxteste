import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import closeLista from "../closeLista"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function saveLista(dispatch: Function){
    try {
        dispatch(R.setRequestSaveListaLoading())

        const endpoint = ``
        const body = {

        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, body })

        if(response){
            dispatch(R.setRequestSaveListaData(response))
            if(!response.flagErro) await closeLista(dispatch)
            else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('saveLista',error)
        dispatch(R.setRequestSaveListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestSaveListaError())
    }
}