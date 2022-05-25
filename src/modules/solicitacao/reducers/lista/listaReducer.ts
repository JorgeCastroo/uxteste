import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Lista, ListaVolume } from "../../interfaces/Lista"

interface State {
    lista: Lista[] | null
    oldLista: Lista[] | null

    currentSolicitacao: Lista | null
}

const initialState: State = {
    lista: null,
    oldLista: null,

    currentSolicitacao: null,
}

const listaSlice = createSlice({
    name: 'lista',
    initialState,
    reducers: {
        setLista: (state, action: PayloadAction<Lista[]>) => {
            state.lista = action.payload
        },
        setOldLista: (state, action: PayloadAction<Lista[]>) => {
            state.oldLista = action.payload
        },

        setCurrentSolicitacao: (state, action: PayloadAction<Lista>) => {
            state.currentSolicitacao = action.payload
        },

        updateVolume: (state, action: PayloadAction<ListaVolume>) => {
            const volumeIndex = state.lista?.find(lista => lista.idLista === action.payload.idLista)!.listaVolumes.findIndex(volume => volume.idVolume === action.payload.idVolume)!
            
            state.lista!.find(f => f.idLista === action.payload.idLista)!.listaVolumes[volumeIndex].dtLeituraFirstMile = new Date().toISOString()
        },

        resetLista: (state) => {
            state.lista = null
            state.oldLista = null
            state.currentSolicitacao = null
        },
    }
})

export const { 
    setLista, setOldLista, 
    setCurrentSolicitacao,
    updateVolume,
    resetLista
} = listaSlice.actions
export default listaSlice.reducer