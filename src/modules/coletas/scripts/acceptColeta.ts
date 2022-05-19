
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestAcceptColetaData } from "../reducers/coletas/requestColetasReducer"

interface Body {
    idUsuario: number,
    dados: [
        {
            idsLista: number[],
            idStatus: 2 // COLETA APROVADA - 2
        },
        {
            idsLista: number[]
            idStatus: 4 // COLETA REPROVADA - 4
        }
    ]
}

export default async function acceptColeta(dispatch: Function, body: Body) {
    try {
        const endpoint = `https://first-mile.herokuapp.com/acceptOrRefuseList/`
        const response = await request.post<ResponsePattern<any>>({ endpoint, body })
        console.log("body: ", body)

        if (response) {
            dispatch(setRequestAcceptColetaData(response))
            if (!response.flagErro) {
                dispatch()
            } else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}