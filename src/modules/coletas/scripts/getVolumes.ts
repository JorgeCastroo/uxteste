import { setVolumes } from "../reducers/coletas/coletas"
import info from "../../../utils/info"
import request from "../../../utils/request"
import { ResponsePattern } from "../../../utils/response/types"
import { setRequestVolumes, setRequestColetasLoading } from "../reducers/coletas/requestVolumesReducer"

export default async function getColetas(dispatch: Function, idUsuario: number){
    try {

        const endpoint = `https://first-mile.herokuapp.com/list/${idUsuario}`
        const response = await request.get<ResponsePattern<any>>({ endpoint })
        dispatch(setRequestColetasLoading)

        if (response) {
            dispatch(setRequestVolumes(response))
            if (!response.flagErro) {
                dispatch(setVolumes(response.listaResultados))
            } else throw new Error(response.listaMensagens[0])
        }else throw new Error('Erro na requisição')
    } catch (error: any) {
        info.error('getColetas',error)
        
    }
}
