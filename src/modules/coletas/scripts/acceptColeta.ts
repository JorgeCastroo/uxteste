
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestAcceptColetasData, setRequestAcceptColetasLoading } from "../reducers/coletas/requestColetasReducer"
import { setLista } from "../../solicitacao/reducers/lista/listaReducer"
import { saveColetasOnAsyncStorage } from "./saveColetasOnAsyncStorage"
import { TRUX_ENDPOINT } from "@env"

// interface Body {
//     idUsuario: number,
//     dados: [
//         {
//             idsLista: number[],
//             idStatusLista: 2 // COLETA APROVADA - 2
//         },
//         {
//             idsLista: number[]
//             idStatusLista: 4 // COLETA REPROVADA - 4
//         }
//     ]
//}

interface Body {
    idLista: number,
    idStatusLista: 2 | 4,
    latitude: string,
    longitude: string
}


export default async function acceptColeta(dispatch: Function, body: Body) {
    try {
        dispatch(setRequestAcceptColetasLoading())

        const endpoint = `${TRUX_ENDPOINT}Lista/FirstMile/AlterarStatusRomaneio`
        const response = await request.post<ResponsePattern<any>>({ endpoint, body })

        if (response) {
            dispatch(setRequestAcceptColetasData(response))
            if (!response.flagErro) {
            } else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}