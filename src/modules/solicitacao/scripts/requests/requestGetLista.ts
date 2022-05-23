import { Solicitacao } from "../../interfaces/Solicitacao"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"
import localSetLista from "../local/localSetLista"

export default async function getLista(dispatch: Function){
    try {
        dispatch(R.setRequestGetListaLoading())

        const endpoint = ``
        const response = await request.get<ResponsePattern<Solicitacao[]>>({ endpoint })

        if(response){
            dispatch(R.setRequestGetListaData(response))
            if(!response.flagErro){
                localSetLista(dispatch, response.listaResultados)
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getLista',error)
        dispatch(R.setRequestGetListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestGetListaError())
    }
}