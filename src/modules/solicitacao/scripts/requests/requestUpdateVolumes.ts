import { VVLOG_AUTHORIZATION, VVLOG_ENDPOINT } from "@env"
import { showMessage } from "react-native-flash-message"
import { UserData } from "../../../../interfaces/UserData"
import { VolumeAtualizado } from "../../interfaces/VolumeAtualizado"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateListaVolumes } from "../../reducers/lista/listaReducer"
import createVolume from "../createVolume"
import createListaConfirmada from "../createListaConfirmada"
import confirmUpdateVolume from "./requestConfirmUpdateVolume"
import request from "../../../../utils/request"
import info from "../../../../utils/info"

export default async function updateVolume(dispatch: Function, userData: UserData){
    try {
        dispatch(R.setRequestUpdateVolumeLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/AtualizacaoLista`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
        }
        const response = await request.post<ResponsePattern<VolumeAtualizado[]>>({ endpoint, authorization, body })

        if(response && 'flagErro' in response){
            dispatch(R.setRequestUpdateVolumeData(response))
            if(!response.flagErro){
                if(response.listaResultados.length > 0){
                    response.listaResultados.forEach(lista => {
                        dispatch(updateListaVolumes({
                            idLista: lista.idLista, 
                            idRemetente: lista.idRemetente,
                            volumes: lista.listaVolumes.map(volume => createVolume(volume.idVolume, lista.idLista, volume.etiqueta))
                        }))
                    })                 
                    showMessage({
                        message: "Novos volumes foram adicionados!",
                        type: "success",
                        duration: 5000,
                        floating: true,
                    })
                    confirmUpdateVolume(dispatch, createListaConfirmada(response.listaResultados))
                }
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('updateVolume',error)
        dispatch(R.setRequestUpdateVolumeMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestUpdateVolumeError())
    }
}