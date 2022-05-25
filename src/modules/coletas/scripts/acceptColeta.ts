
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestColetasAceitasData, setRequestAcceptColetasLoading } from "../reducers/coletas/requestColetasReducer"
import { ALTERAR_STATUS_ROMANEIO } from "@env"

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

        const endpoint = `${ALTERAR_STATUS_ROMANEIO}`
        const response = await request.post<ResponsePattern<any>>({ authorization, endpoint, body })
        console.log("RESPONSE", response)

        if (response) {
            dispatch(setRequestColetasAceitasData(response))
            return response
        } else throw new Error('Erro na requisição')

    } catch (error: any) {
        info.error('getColetas', error)
    }
}