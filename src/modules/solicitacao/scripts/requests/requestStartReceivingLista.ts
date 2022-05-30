import { TRUX_HML_ENDPOINT } from "@env"
import { Coordinates } from "../../../../interfaces/Coordinates"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateSituacao } from "../../reducers/lista/listaReducer"
import info from "../../../../utils/info"
import request from "../../../../utils/request"
import { idStatusLista } from "../../../../constants/idStatusLista"

export default async function startReceivingLista(dispatch: Function, redirect: () => void, sync: boolean, idLista: number, idRemetente: number, coords: Coordinates){
    try {
        dispatch(R.setRequestStartReceivingListaLoading())

        const endpoint = `${TRUX_HML_ENDPOINT}/Lista/FirstMile/AlterarStatusRomaneio`
        const authorization = 'basic uxAks0947sj@hj'
        const body = {
            idLista,
            idStatusLista: idStatusLista['COLETANDO'],
            latitude: coords.latitude,
            longitude: coords.longitude
        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response){
            dispatch(R.setRequestStartReceivingListaData(response))
            if(!response.flagErro){
                if(!sync){
                    dispatch(updateSituacao({status: 'COLETANDO', idRemetente}))
                    redirect()
                } 
                return true
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('startReceivingLista',error)
        dispatch(R.setRequestStartReceivingListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestStartReceivingListaError())
        return false
    }
}