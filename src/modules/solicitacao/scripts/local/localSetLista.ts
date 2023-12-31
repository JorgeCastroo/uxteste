import { Lista } from "../../interfaces/Lista"
import { setLista, setOldLista } from "../../reducers/lista/listaReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localSetLista(dispatch: Function, lista: Lista[], saveLista?: boolean){
    try {
        info.log('localSetLista','saving lista to local storage...')
        await storage.setItem('lista', lista)
        dispatch(setOldLista(lista))
        if(!!saveLista) dispatch(setLista(lista))
    } catch (error: any) {
        info.error('localSetLista',error)
    }
}