
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestAcceptColetasData, setRequestAcceptColetasLoading } from "../reducers/coletas/requestColetasReducer"
import { setLista } from "../../solicitacao/reducers/lista/listaReducer"
import { saveColetasOnAsyncStorage } from "./saveColetasOnAsyncStorage"
import { Coletas } from "../reducers/coletas/coletas"

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
        dispatch(setRequestAcceptColetasLoading())

        const endpoint = `https://first-mile.herokuapp.com/acceptOrRefuseList/`
        const response = await request.post<ResponsePattern<any>>({ endpoint, body })

        if (response) {
            dispatch(setRequestAcceptColetasData(response))
            if (!response.flagErro) {
                dispatch(setLista(response.listaResultados))
                saveColetasOnAsyncStorage([response.listaResultados])
            } else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}