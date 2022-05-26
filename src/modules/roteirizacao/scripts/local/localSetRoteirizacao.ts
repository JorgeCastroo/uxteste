import { RoteirizacaoResponse } from "../../../../interfaces/Roteirizacao"
import { setRoteirizacao } from "../../reducers/roteirizacaoReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localSetRoteirizacao(dispatch: Function, roteirizacao: RoteirizacaoResponse){
    try {
        await storage.setItem('roteirizacao', roteirizacao)
        dispatch(setRoteirizacao(roteirizacao))
    } catch (error: any) {
        info.error('localSetRoteirizacao',error)
    }
}