import { setLoadingNewLista } from "../reducers/lista/listaReducer"
import getLista from "./requests/requestGetLista"
import info from "../../../utils/info"
import sleep from "../../../utils/sleep"

export default async function loadLista(dispatch: Function){
    try {
        dispatch(setLoadingNewLista(true))

        await getLista(dispatch)
        await sleep(5000)

        dispatch(setLoadingNewLista(false))
    } catch (error) {
        info.error('loadLista',error)
    }
}