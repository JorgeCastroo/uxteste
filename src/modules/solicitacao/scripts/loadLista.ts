import { Coordinates } from "../../../interfaces/Coordinates"
import { Lista } from "../interfaces/Lista"
import { setLoadingNewLista } from "../reducers/lista/listaReducer"
import getLista from "./requests/requestGetLista"
import getRoteirizacao from "../../roteirizacao/scripts/request/getRoteirizacao"
import createRoteirizacaoPayload from "../../roteirizacao/scripts/createRoteirizacaoPayload"
import info from "../../../utils/info"
import sleep from "../../../utils/sleep"

export default async function loadLista(dispatch: Function, idMotorista: number, coords: Coordinates, oldListas: Lista[] | null){
    try {
        dispatch(setLoadingNewLista(true))

        const reponseLista = await getLista(dispatch, idMotorista)
        if(!!reponseLista){
            let newListas: Lista[] = []

            if(oldListas) newListas = [...reponseLista.filter(f => !oldListas.map(item => item.idRemetente).includes(f.idRemetente)), ...oldListas]
            else newListas = reponseLista

            const roteirizacaoPayload = await createRoteirizacaoPayload(dispatch, newListas, coords)
            await getRoteirizacao(dispatch, roteirizacaoPayload)
        }
        await sleep(3000)

        dispatch(setLoadingNewLista(false))
    } catch (error) {
        info.error('loadLista',error)
    }
}