import { Endereco } from "../interfaces/Lista"

export default function getScannedVolumes(currentSolicitacao: Endereco){
    return currentSolicitacao.listaVolumes.filter(f => f.dtLeituraFirstMile !== '').map(item => item.etiqueta)
}