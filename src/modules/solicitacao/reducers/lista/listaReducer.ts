import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Lista, ListaVolume } from "../../interfaces/Lista"
import { idStatusLista } from "../../../../constants/idStatusLista"

interface State {
    lista: Lista[] | null
    oldLista: Lista[] | null

    filteredLista: Lista[] | null

    currentSolicitacao: Lista | null
    currentVolumes: ListaVolume[] | null
    currentPosition: number | null

    loadingNewLista: boolean
}

const initialState: State = {
    lista: null,
    oldLista: null,

    filteredLista: null,

    currentSolicitacao: null,
    currentVolumes: null,
    currentPosition: null,

    loadingNewLista: false,
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
        setFilteredLista: (state, action: PayloadAction<Lista[] | null>) => {
            state.filteredLista = action.payload
        },

        setCurrentSolicitacao: (state, action: PayloadAction<Lista>) => {
            state.currentSolicitacao = action.payload
        },
        setCurrentVolumes: (state, action: PayloadAction<ListaVolume[]>) => {
            state.currentVolumes = action.payload
        },
        setCurrentPosition: (state, action: PayloadAction<number>) => {
            state.currentPosition = action.payload
        },

        updateSituacao: (state, action: PayloadAction<{status: keyof typeof idStatusLista, idLista?: number}>) => {
            state.lista!.find(f => f.idLista === action.payload.idLista ?? state.currentSolicitacao!.idLista)!.situacao = idStatusLista[action.payload.status]
            if(state.currentSolicitacao) state.currentSolicitacao!.situacao = idStatusLista[action.payload.status]
            
            state.lista = [...state.lista!]
        },
        updateVolume: (state, action: PayloadAction<string>) => {
            const volumeIndex = state.lista?.find(lista => lista.idLista === state.currentSolicitacao!.idLista)!.listaVolumes.findIndex(volume => volume.etiqueta === action.payload)!
            
            state.lista!.find(f => f.idLista === state.currentSolicitacao!.idLista)!.listaVolumes[volumeIndex].dtLeituraFirstMile = new Date().toISOString()
            state.lista = [...state.lista!]
        },

        resetLista: (state) => {
            state.lista = null
            state.oldLista = null
            state.filteredLista = null
            state.currentSolicitacao = null
            state.currentVolumes = null
        },

        setLoadingNewLista: (state, action: PayloadAction<boolean>) => {
            state.loadingNewLista = action.payload
        },
    }
})

export const { 
    setLista, setOldLista, setFilteredLista,
    setCurrentSolicitacao, setCurrentVolumes, setCurrentPosition,
    updateVolume, updateSituacao,
    setLoadingNewLista,
    resetLista,
} = listaSlice.actions
export default listaSlice.reducer