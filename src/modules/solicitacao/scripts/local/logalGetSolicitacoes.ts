import { Solicitacao } from "../../interfaces/Solicitacao"
import { setSolicitacoes } from "../../reducers/solicitacaoReducer"
import info from "../../../../utils/info"
import storage from "../../../../utils/storage"

export default async function localGetSolicitacoes(dispatch: Function){
    try {
        const solicitacoes = await storage.getItem<Solicitacao[]>('solicitacoes')
        if(!!solicitacoes) dispatch(setSolicitacoes(solicitacoes))
    } catch (error: any) {
        info.error('localGetSolicitacoes',error)
    }
}