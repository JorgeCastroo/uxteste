import { ListaVolume } from "../interfaces/Solicitacao"

export default function createVolume(idVolume: number, idLista: number, etiqueta: string): ListaVolume {
    return { idVolume, idLista, etiqueta, dtLeituraFirstMile: '' }
}