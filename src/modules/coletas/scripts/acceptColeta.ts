
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestAcceptColetaData, setRequestColetasLoading } from "../reducers/coletas/requestColetasReducer"
import { Coletas, setColetasOffline, setVolumesOffline } from "../reducers/coletas/coletas"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { saveColetasOnAsyncStorage } from "./saveColetasOnAsyncStorage"

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

export default async function acceptColeta(dispatch: Function, idsColetasAprovadas: number[], coletas: Coletas[], body: Body) {
    try {
        const endpoint = `https://first-mile.herokuapp.com/acceptOrRefuseList/`
        const response = await request.post<ResponsePattern<any>>({ endpoint, body })

        dispatch(setRequestColetasLoading)

        if (response) {
            dispatch(setRequestAcceptColetaData(response))
            if (!response.flagErro) {
                // setando coletas para salvalas depois no async storage
                dispatch(setColetasOffline(response.listaResultados))
                saveColetasOnAsyncStorage(idsColetasAprovadas, coletas)

            } else throw new Error(response.listaMensagens[0])
        } else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas', error)
    }
}