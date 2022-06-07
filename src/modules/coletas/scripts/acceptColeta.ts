
import { TRUX_ENDPOINT } from "@env"
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestColetasAceitasData, setRequestAcceptColetasLoading } from "../reducers/coletas/requestColetasReducer"

interface Body {
    idLista: number,
    idStatusLista: number,
    latitude: string,
    longitude: string
}

export default async function acceptColeta(dispatch: Function, body: Body) {
    try {
        dispatch(setRequestAcceptColetasLoading())

        const endpoint = `${TRUX_ENDPOINT}/Lista/FirstMile/AlterarStatusRomaneio`
        const authorization = "basic mc0}fn7)za6#"
        const response = await request.post<ResponsePattern<any>>({ authorization, endpoint, body })

        if (response) {
            dispatch(setRequestColetasAceitasData(response))
            return response
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('acceptColeta', error)
    }
}