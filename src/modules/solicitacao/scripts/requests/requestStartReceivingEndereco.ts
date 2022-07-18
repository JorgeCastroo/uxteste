import { VVLOG_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { Coordinates } from "../../../../interfaces/Coordinates"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateEnderecoSituacao, updateListaSituacao } from "../../reducers/lista/listaReducer"
import info from "../../../../utils/info"
import request from "../../../../utils/request"

export default async function startReceivingEndereco(dispatch: Function, redirect: () => void, sync: boolean, idLista: number, idRemetente: number, coords: Coordinates){
    try {
        dispatch(R.setRequestStartReceivingEnderecoLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idLista,
            idRemetente,
            latitude: coords.latitude,
            longitude: coords.longitude
        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestStartReceivingEnderecoData(response))
            if(!response.flagErro){
                if(!sync){
                    dispatch(updateEnderecoSituacao({status: 'COLETANDO', idLista, idRemetente}))
                    redirect()
                } 
                return true
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('startReceivingEndereco',error)
        dispatch(R.setRequestStartReceivingEnderecoMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestStartReceivingEnderecoError())
        return false
    }
}