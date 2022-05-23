import { Lista } from "../../interfaces/Lista"
import { setLista } from "../../reducers/lista/listaReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localGetLista(dispatch: Function){
    try {
        const lista = await storage.getItem<Lista[]>('lista')
        if(!!lista) dispatch(setLista(lista))
    } catch (error: any) {
        info.error('localGetLista',error)
    }
}