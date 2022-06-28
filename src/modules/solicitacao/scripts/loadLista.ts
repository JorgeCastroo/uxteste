import { UserData } from "../../../interfaces/UserData"
import { Coordinates } from "../../../interfaces/Coordinates"
import { Lista } from "../interfaces/Lista"
import { setLoadingNewLista } from "../reducers/lista/listaReducer"
import getLista from "./requests/requestGetLista"
import getRoteirizacao from "../../roteirizacao/scripts/request/getRoteirizacao"
import createRoteirizacaoPayload from "../../roteirizacao/scripts/createRoteirizacaoPayload"
import info from "../../../utils/info"
import sleep from "../../../utils/sleep"
import localSetLista from "./local/localSetLista"

export default async function loadLista(dispatch: Function, userData: UserData, coords: Coordinates, oldListas: Lista[] | null){
    try {
        dispatch(setLoadingNewLista(true))

        const reponseLista = await getLista(dispatch, userData)
        if(!!reponseLista){
            let newListas: Lista[] = []

            if(oldListas) newListas = [...reponseLista.filter(f => !oldListas.map(item => item.idLista).includes(f.idLista)), ...oldListas]
            else newListas = reponseLista

            const roteirizacaoPayload = await createRoteirizacaoPayload(dispatch, newListas, coords)
            
            const roteirizacaoResponse = await getRoteirizacao(dispatch, roteirizacaoPayload)
            if(!!roteirizacaoResponse) await localSetLista(dispatch, reponseLista)
        }
        await sleep(3000)

        dispatch(setLoadingNewLista(false))
    } catch (error) {
        info.error('loadLista',error)
    }
}