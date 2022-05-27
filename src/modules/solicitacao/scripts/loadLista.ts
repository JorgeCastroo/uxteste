import { setLoadingNewLista } from "../reducers/lista/listaReducer"
import getLista from "./requests/requestGetLista"
import getRoteirizacao from "../../roteirizacao/scripts/request/getRoteirizacao"
import createRoteirizacaoPayload from "../../roteirizacao/scripts/createRoteirizacaoPayload"
import info from "../../../utils/info"
import sleep from "../../../utils/sleep"
import { Coordinates } from "../../../interfaces/Coordinates"

export default async function loadLista(dispatch: Function, coords: Coordinates){
    try {
        dispatch(setLoadingNewLista(true))

        const lista = await getLista(dispatch)
        if(!!lista){
            const roteirizacaoPayload = await createRoteirizacaoPayload(dispatch, lista, coords)
            await getRoteirizacao(dispatch, roteirizacaoPayload)
        }
        await sleep(5000)

        dispatch(setLoadingNewLista(false))
    } catch (error) {
        info.error('loadLista',error)
    }
}