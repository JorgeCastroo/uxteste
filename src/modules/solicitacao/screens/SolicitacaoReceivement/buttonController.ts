import { Lista } from "../../interfaces/Lista"
import findLista from "../../scripts/findLista"

export function volumesTimeline(listas: Lista[], idLista: number){
    const currentVolumes = findLista(listas, idLista).listaVolumes
    return {
        start: currentVolumes.every(f => f.dtLeituraFirstMile === ""),
        end: currentVolumes.every(f => f.dtLeituraFirstMile !== ""),
    }
}

export function buttonLabel(listas: Lista[], idLista: number){
    const timeline = volumesTimeline(listas, idLista)
    if(timeline.start) return 'Iniciar Recebimento'
    if(timeline.end) return 'Finalizar Recebimento'
    return 'Continuar Recebimento'
}

export function buttonFunction(listas: Lista[], idLista: number, redirect: Function){
    const timeline = volumesTimeline(listas, idLista)
    if(timeline.start) return redirect('solicitacaoScan')
    if(timeline.end) return console.log('close solicitacao')
    return redirect('solicitacaoScan')
}