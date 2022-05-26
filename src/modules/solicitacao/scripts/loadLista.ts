import { setLoadingNewLista } from "../reducers/lista/listaReducer"
import getLista from "./requests/requestGetLista"
import getRoteirizacao from "../../roteirizacao/scripts/request/getRoteirizacao"
import createRoteirizacaoPayload from "../../roteirizacao/scripts/createRoteirizacaoPayload"
import info from "../../../utils/info"
import sleep from "../../../utils/sleep"

export default async function loadLista(dispatch: Function){
    try {
        dispatch(setLoadingNewLista(true))

        const lista = await getLista(dispatch)
        if(lista){
            const body = await createRoteirizacaoPayload(dispatch, lista)
            await getRoteirizacao(dispatch, body)
        }
        await sleep(5000)

        dispatch(setLoadingNewLista(false))
    } catch (error) {
        info.error('loadLista',error)
    }
}