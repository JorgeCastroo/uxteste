import { Solicitacao } from "../../interfaces/Solicitacao"
import { setOldSolicitacoes, setSolicitacoes } from "../../reducers/solicitacaoReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localGetSolicitacoes(dispatch: Function, solicitacoes: Solicitacao[]){
    try {
        info.log('localGetSolicitacoes','saving solicitacoes to local storage...')
        await storage.setItem('solicitacoes', solicitacoes)
        dispatch(setSolicitacoes(solicitacoes))
        dispatch(setOldSolicitacoes(solicitacoes))
    } catch (error: any) {
        info.error('localGetSolicitacoes',error)
    }
}