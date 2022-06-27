import { VVLOG_AUTHORIZATION, VVLOG_ENDPOINT } from "@env"
import { StatusBar } from "react-native"
import { showMessage } from "react-native-flash-message"
import { UserData } from "../../../../interfaces/UserData"
import { ListaAtualizada } from "../../interfaces/ListaAtualizada"
import { ResponsePattern } from "../../../../utils/response/types"
import * as R from "../../reducers/lista/requestListaReducer"
import { updateListaVolumes } from "../../reducers/lista/listaReducer"
import createVolume from "../createVolume"
import info from "../../../../utils/info"
import request from "../../../../utils/request"

export default async function updateLista(dispatch: Function, userData: UserData){
    try {
        dispatch(R.setRequestUpdateListaLoading())

        const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/AtualizacaoLista`
        const authorization = VVLOG_AUTHORIZATION
        const body = {
            idTransportadora: userData.idTransportadora,
            idMotorista: userData.idUsuarioSistema,
        }
        const response = await request.post<ResponsePattern<ListaAtualizada[]>>({ endpoint, authorization, body })

        if(response){
            dispatch(R.setRequestUpdateListaData(response))
            if(!response.flagErro){
                if(response.listaResultados.length > 0){
                    response.listaResultados.forEach(lista => {
                        const volumes = lista.listaVolumes.map(volume => createVolume(volume.idVolume, lista.idLista, volume.etiqueta))
                        dispatch(updateListaVolumes({idLista: lista.idLista, volumes}))
                    })                 
                    showMessage({
                        message: "Novos volumes foram adicionados",
                        type: "success",
                        statusBarHeight: StatusBar.currentHeight,
                    })
                }
            }else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('updateLista',error)
        dispatch(R.setRequestUpdateListaMessage(error.message ?? JSON.stringify(error)))
        dispatch(R.setRequestUpdateListaError())
    }
}