
import { VVLOG_HML_ENDPOINT, VVLOG_AUTHORIZATION } from "@env"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestColetasAceitasData, setRequestAcceptColetasLoading } from "../reducers/coletas/requestColetasReducer"
import info from "../../../utils/info"
import request from "../../../utils/request"

interface Body {
    idLista: number,
    idStatusLista: number,
    latitude: string,
    longitude: string
}

export default async function acceptColeta(dispatch: Function, body: Body) {
    try {
        dispatch(setRequestAcceptColetasLoading())

        const endpoint = `${VVLOG_HML_ENDPOINT}/Lista/FirstMile/AlterarStatusRomaneio`
        const authorization = VVLOG_AUTHORIZATION
        const response = await request.post<ResponsePattern<any>>({ authorization, endpoint, body })

        if (response) {
            dispatch(setRequestColetasAceitasData(response))
            return response
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('acceptColeta', error)
    }
}