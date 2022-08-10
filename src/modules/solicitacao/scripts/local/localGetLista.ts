import { Lista } from "../../interfaces/Lista"
import { setLista } from "../../reducers/lista/listaReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"
import MOCK_LISTA from "../../../../mock/lista"

export default async function localGetLista(dispatch: Function){
    try {
        //const lista = await storage.getItem<Lista[]>('lista')
        const lista = MOCK_LISTA as any
        if(!!lista) dispatch(setLista(lista))
    } catch (error: any) {
        info.error('localGetLista',error)
    }
}