import { resetLista } from "../reducers/lista/listaReducer"
import { resetRequestGetLista, resetRequestSaveLista } from "../reducers/lista/requestListaReducer"
import { resetRequestGetRoteirizacao } from "../../roteirizacao/reducers/requestRoteirizacaoReducer"
import { resetRoteirizacao } from "../../roteirizacao/reducers/roteirizacaoReducer"
import { resetMap } from "../../map/reducers/mapReducer"
import info from "../../../utils/info"
import storage from "../../../utils/storage"

export default async function removeLista(dispatch: Function){
    try {
        await storage.removeItem('roteirizacao')
        dispatch(resetRoteirizacao())

        await storage.removeItem('lista')
        dispatch(resetLista())

        dispatch(resetMap())
        dispatch(resetRequestGetRoteirizacao())
        dispatch(resetRequestGetLista())
        dispatch(resetRequestSaveLista())
    } catch (error: any) {
        info.error('removeLista',error)
    }
}