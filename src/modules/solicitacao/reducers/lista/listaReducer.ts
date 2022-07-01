import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Endereco, Lista, ListaVolume } from "../../interfaces/Lista"
import { idStatusLista } from "../../../../constants/idStatusLista"
import isoDateTime from "../../../../utils/isoDateTime"

interface State {
    lista: Lista[] | null
    oldLista: Lista[] | null

    filteredEnderecos: Endereco[] | null

    currentLista: Lista | null
    currentSolicitacao: Endereco | null
    currentVolumes: ListaVolume[] | null
    currentPosition: number | null

    loadingNewLista: boolean
}

const initialState: State = {
    lista: null,
    oldLista: null,

    filteredEnderecos: null,

    currentLista: null,
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
        setFilteredEndereco: (state, action: PayloadAction<Endereco[] | null>) => {
            state.filteredEnderecos = action.payload
        },

        setCurrentLista: (state, action: PayloadAction<Lista | null>) => {
            state.currentLista = action.payload
        },
        setCurrentSolicitacao: (state, action: PayloadAction<Endereco>) => {
            state.currentSolicitacao = action.payload
        },
        setCurrentVolumes: (state, action: PayloadAction<ListaVolume[]>) => {
            state.currentVolumes = action.payload
        },
        setCurrentPosition: (state, action: PayloadAction<number>) => {
            state.currentPosition = action.payload
        },

        updateListaSituacao: (state, action: PayloadAction<{status: keyof typeof idStatusLista, idLista?: number}>) => {
            state.lista!.find(f => f.idLista === action.payload.idLista)!.situacao = idStatusLista[action.payload.status]

            if(state.currentLista && state.currentLista.idLista === action.payload.idLista){
                state.currentLista.situacao = idStatusLista[action.payload.status]
            }

            state.lista = [...state.lista!]
        },
        updateEnderecoSituacao: (state, action: PayloadAction<{status: keyof typeof idStatusLista, idLista: number, idRemetente: number}>) => {
            state.lista!
            .find(f => f.idLista === action.payload.idLista)!.listaEnderecos
            .find(f => f.idRemetente === action.payload.idRemetente)!.situacao = idStatusLista[action.payload.status]

            if(state.currentSolicitacao) state.currentSolicitacao!.situacao = idStatusLista[action.payload.status]
            state.lista = [...state.lista!]
        },

        updateEnderecoVolume: (state, action: PayloadAction<string>) => {
            const current = state.currentSolicitacao!
            const volumeIndex = state.currentSolicitacao!.listaVolumes.findIndex(volume => volume.etiqueta === action.payload)!
            const updateDate = isoDateTime()

            state.lista!
            .find(f => f.idLista === current.idLista)!.listaEnderecos
            .find(f => f.idRemetente === current.idRemetente)!.listaVolumes[volumeIndex].dtLeituraFirstMile = updateDate

            state.lista = [...state.lista!]
        },
        updateListaVolumes: (state, action: PayloadAction<{idLista: number, idRemetente: number, volumes: ListaVolume[]}>) => {
            const enderecoToUpdate = state.lista!.find(f => f.idLista === action.payload.idLista)!.listaEnderecos.find(f => f.idRemetente === action.payload.idRemetente)!
            const newVolumes: ListaVolume[] = []

            action.payload.volumes.forEach(volume => {
                if(!enderecoToUpdate.listaVolumes.map(i => i.idVolume).includes(volume.idVolume)) newVolumes.push(volume)
            })

            if(newVolumes.length > 0){
                state.lista!
                .find(f => f.idLista === action.payload.idLista)!.listaEnderecos
                .find(f => f.idRemetente === action.payload.idRemetente)!.listaVolumes = [...enderecoToUpdate.listaVolumes, ...newVolumes]

                state.lista = [...state.lista!]
            }
        },

        resetLista: (state) => {
            state.lista = null
            state.oldLista = null
            state.filteredEnderecos = null
            state.currentLista = null
            state.currentSolicitacao = null
            state.currentVolumes = null
            state.currentPosition = null
        },

        setLoadingNewLista: (state, action: PayloadAction<boolean>) => {
            state.loadingNewLista = action.payload
        },
    }
})

export const { 
    setLista, setOldLista, setFilteredEndereco,
    setCurrentLista, setCurrentSolicitacao, setCurrentVolumes, setCurrentPosition,
    updateEnderecoVolume, updateListaSituacao, updateEnderecoSituacao, updateListaVolumes,
    setLoadingNewLista,
    resetLista,
} = listaSlice.actions
export default listaSlice.reducer