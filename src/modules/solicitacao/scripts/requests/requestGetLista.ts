import { TRUX_HML_ENDPOINT } from "@env"
import { Lista } from "../../interfaces/Lista"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"
import localSetLista from "../local/localSetLista"
import { idStatusLista } from "../../../../constants/idStatusLista"

export default async function getLista(dispatch: Function){
    try {
        dispatch(R.setRequestGetListaLoading())

        const endpoint = `${TRUX_HML_ENDPOINT}/Lista/FirstMile/ListarRomaneio`
        const authorization = 'basic uxAks0947sj@hj'
        const body = {
            idTransportadora: 18,
            idMotorista: 9453,
            idStatusLista: idStatusLista['COLETANDO'],
        }
        const response = await request.post<ResponsePattern<Lista[]>>({ endpoint, authorization, body })

        if(response){
            dispatch(R.setRequestGetListaData(response))
            if(!response.flagErro){
                localSetLista(dispatch, response as any)
                return response as unknown as Lista[]
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getLista',error)
        dispatch(R.setRequestGetListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestGetListaError())
        return null
    }
}