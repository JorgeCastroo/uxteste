import { TRUX_ENDPOINT } from "@env"
import { Lista } from "../../interfaces/Lista"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"
import localSetLista from "../local/localSetLista"
import { idStatusLista } from "../../../../constants/idStatusLista"
import MOCK_USERDATA from "../../../../mock/userData"

export default async function getLista(dispatch: Function, idMotorista: number){
    try {
        dispatch(R.setRequestGetListaLoading())

        const endpoint = `${TRUX_ENDPOINT}/Lista/FirstMile/ListarRomaneio`
        const authorization = 'basic mc0}fn7)za6#'
        const body = {
            idTransportadora: 1,
            // idMotorista: MOCK_USERDATA.idUser,
            idMotorista,
            idStatusLista: idStatusLista['APROVADO'],
        }
        const response = await request.post<ResponsePattern<Lista[]>>({ endpoint, authorization, body })

        if(response){
            dispatch(R.setRequestGetListaData(response))
            if(!response.flagErro){
                localSetLista(dispatch, response.listaResultados)
                return response.listaResultados
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getLista',error)
        dispatch(R.setRequestGetListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestGetListaError())
        return null
    }
}