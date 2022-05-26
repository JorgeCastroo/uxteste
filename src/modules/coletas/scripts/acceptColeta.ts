
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestColetasAceitasData, setRequestAcceptColetasLoading } from "../reducers/coletas/requestColetasReducer"
import { TRUX_HML_ENDPOINT } from "@env"

interface Body {
    idLista: number,
    idStatusLista: 2 | 4,
    latitude: string,
    longitude: string
}

export default async function acceptColeta(dispatch: Function, body: Body) {
    try {
        dispatch(setRequestAcceptColetasLoading())

        const authorization = "basic uxAks0947sj@hj"

        const endpoint = `${TRUX_HML_ENDPOINT}/Lista/FirstMile/AlterarStatusRomaneio`
        const response = await request.post<ResponsePattern<any>>({ authorization, endpoint, body })

        if (response) {
            dispatch(setRequestColetasAceitasData(response))
            return response
        } else throw new Error('Erro na requisição')

    } catch (error: any) {
        info.error('getColetas', error)
    }
}