import { TRUX_HML_ENDPOINT } from "@env"
import { setColetas } from "../reducers/coletas/coletas"
import { Lista } from "../../solicitacao/interfaces/Lista"
import { setRequestColetasData, setRequestColetasLoading } from "../reducers/coletas/requestColetasReducer"
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import MOCK_USERDATA from "../../../mock/userData"

export default async function getColetas(dispatch: Function, idMotorista: number) {
    try {
        dispatch(setRequestColetasLoading())

        const endpoint = `${TRUX_HML_ENDPOINT}/Lista/FirstMile/ListarRomaneio`
        const authorization = 'basic uxAks0947sj@hj'
        const body = {
            idTransportadora: 18,
            //idMotorista: MOCK_USERDATA.idUser,
            idMotorista,
            idStatusLista: 1,
        }
        const response = await request.post<ResponsePattern<Lista[]>>({ endpoint, authorization, body })

        if (response) {
            dispatch(setRequestColetasData(response))
            if (!response.flagErro) dispatch(setColetas(response.listaResultados))
            else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}
