import { RoteirizacaoResponse } from "../../../../interfaces/Roteirizacao"
import { setRoteirizacao } from "../../reducers/roteirizacaoReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localGetRoteirizacao(dispatch: Function){
    try {
        const roteirizacao = await storage.getItem<RoteirizacaoResponse>('roteirizacao')
        if(!!roteirizacao) dispatch(setRoteirizacao(roteirizacao))
    } catch (error: any) {
        info.error('localGetRoteirizacao',error)
    }
}