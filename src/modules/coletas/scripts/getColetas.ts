import { setColetas } from "../reducers/coletas/coletas"
import { setRequestColetasData, setRequestColetasLoading } from "../reducers/coletas/requestColetasReducer"
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { TRUX_HML_ENDPOINT } from "@env"
import { Lista } from "../../solicitacao/interfaces/Lista"

export default async function getColetas(dispatch: Function) {
    try {
        dispatch(setRequestColetasLoading())

        const endpoint = `${TRUX_HML_ENDPOINT}/Lista/FirstMile/ListarRomaneio`
        const authorization = 'basic uxAks0947sj@hj'
        const body = {
            idTransportadora: 18,
            idMotorista: 9453,
            idStatusLista: 2
        }
        const response = await request.post<ResponsePattern<Lista[]>>({ endpoint, authorization, body })

        if (response) {
            dispatch(setRequestColetasData(response))
            if (!response.flagErro) {
                dispatch(setColetas((response as any).listaResultado))
            } else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}
