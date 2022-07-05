import { Endereco, Lista } from "../interfaces/Lista"
import { Volume } from "../interfaces/Volume"
import findEndereco from "./findEndereco"

export default function getVolumes(lista: Lista[], currentSolicitacao: Endereco): Volume[] {
    const volumes = findEndereco(lista!, currentSolicitacao!).listaVolumes

    return volumes.filter(f => f.dtLeituraFirstMile !== '').map(item => { return { idVolume: item.idVolume, dtLeitura: item.dtLeituraFirstMile } })
}