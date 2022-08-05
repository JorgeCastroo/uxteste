import { VVLOG_AUTHORIZATION, VVLOG_ENDPOINT } from "@env"
import { getUniqueId } from "react-native-device-info"
import { Coordinates } from "../../../../interfaces/Coordinates"
import { UserData } from "../../../../interfaces/UserData"
import * as R from "../../reducers/requestAppReducer"
import request from "../../../../utils/request"
import info from "../../../../utils/info"
import { ResponsePattern } from "../../../../utils/response/types"
import isoDateTime from "../../../../utils/isoDateTime"

export default async function sendAppLocation(dispatch: Function, { idTransportadora, idUsuarioSistema }: UserData, idsLista: number[], coords: Coordinates){
    try {
        dispatch(R.setRequestAppLocationLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/EnviarPosicaoMotorista`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idMotorista: idUsuarioSistema,
            idsLista,
            dtCaptura: isoDateTime(),
            idTransportadora,
            latitude: coords.latitude,
            longitude: coords.longitude,
            idDevice: await getUniqueId(),
            flagGPSAtivo: true
        }
        const response = await request.post<ResponsePattern<any>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestAppLocationData(response))
            if(response.flagErro) throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('sendAppLocation',error)
        dispatch(R.setRequestAppLocationMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestAppLocationError())
    }
}