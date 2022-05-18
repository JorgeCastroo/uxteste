import { setAcceptColeta } from "../reducers/coletas/coletas"
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestAcceptColetaData } from "../reducers/coletas/requestColetasReducer"

export default async function acceptAllColetas(dispatch: Function, idsColetas: number[], idUsuario: number) {
    try {

        const body = { listaAceita: true, idsColetas, idUsuario }

        const endpoint = `https://first-mile.herokuapp.com/acceptOrRefuseList/`
        const response = await request.post<ResponsePattern<any>>({ endpoint, body })

        if (response) {
            dispatch(setRequestAcceptColetaData(response))
            if (!response.flagErro) {
                dispatch(setAcceptColeta)
            } else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}