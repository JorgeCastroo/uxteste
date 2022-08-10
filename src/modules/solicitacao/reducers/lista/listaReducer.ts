import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Endereco, Lista, ListaVolume } from "../../interfaces/Lista"
import { VolumeAtualizado } from "../../interfaces/VolumeAtualizado"
import { idStatusLista } from "../../../../constants/idStatusLista"
import isoDateTime from "../../../../utils/isoDateTime"
import createVolume from "../../scripts/createVolume"

interface State {
    lista: Lista[] | null
    oldLista: Lista[] | null
    filteredEnderecos: Endereco[] | null
    currentLista: Lista | null
    currentSolicitacao: Endereco | null
    loadingNewLista: boolean
}

const initialState: State = {
    lista: null,
    oldLista: null,
    filteredEnderecos: null,
    currentLista: null,
    currentSolicitacao: null,
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

        updateListaSituacao: (state, action: PayloadAction<{status: keyof typeof idStatusLista, idLista: number}>) => {
            state.lista!.find(f => f.idLista === action.payload.idLista)!.situacao = idStatusLista[action.payload.status]

            if(['CANCELADO'].includes(action.payload.status)){
                state.lista!.find(f => f.idLista === action.payload.idLista)!.listaEnderecos.map(endereco => {
                    endereco.situacao = idStatusLista[action.payload.status]
                    return endereco
                })
            }

            state.lista = [...state.lista!]
        },
        updateEnderecoSituacao: (state, action: PayloadAction<{status: keyof typeof idStatusLista, idLista: number, idRemetente: number}>) => {
            state.lista!
            .find(f => f.idLista === action.payload.idLista)!.listaEnderecos
            .find(f => f.idLista === action.payload.idLista && f.idRemetente === action.payload.idRemetente)!.situacao = idStatusLista[action.payload.status]

            state.lista = [...state.lista!]
        },
        updateListaEnderecoSituacao: (state, action: PayloadAction<{status: keyof typeof idStatusLista, idLista: number, idRemetente: number}>) => {
            state.lista!.find(f => f.idLista === action.payload.idLista)!.situacao = idStatusLista[action.payload.status]
            state.lista!
            .find(f => f.idLista === action.payload.idLista)!.listaEnderecos
            .find(f => f.idLista === action.payload.idLista && f.idRemetente === action.payload.idRemetente)!.situacao = idStatusLista[action.payload.status]

            state.lista = [...state.lista!]
        },
        updateListaVolumes: (state, action: PayloadAction<{idLista: number, idRemetente: number, volumes: ListaVolume[]}>) => {
            const enderecoToUpdate = state.lista!.find(f => f.idLista === action.payload.idLista)!.listaEnderecos.find(f => f.idLista === action.payload.idLista && f.idRemetente === action.payload.idRemetente)!
            const newVolumes: ListaVolume[] = []

            action.payload.volumes.forEach(volume => {
                if(!enderecoToUpdate.listaVolumes.map(i => i.idVolume).includes(volume.idVolume)) newVolumes.push(volume)
            })

            if(newVolumes.length > 0){
                state.lista!
                .find(f => f.idLista === action.payload.idLista)!.listaEnderecos
                .find(f => f.idLista === action.payload.idLista && f.idRemetente === action.payload.idRemetente)!.listaVolumes = [...enderecoToUpdate.listaVolumes, ...newVolumes]  
                
                state.lista = [...state.lista!]
            }
        },

        updateListas: (state, action: PayloadAction<Endereco[]>) => {
            action.payload.forEach(endereco => {
                const currentLista = state.lista!.find(f => f.idLista === endereco.idLista)!
                if(currentLista.listaEnderecos.find(f => f.idRemetente === endereco.idRemetente)){
                    const currentVolumes = currentLista.listaEnderecos.find(f => f.idLista === endereco.idLista && f.idRemetente === endereco.idRemetente)!.listaVolumes
                    const volumesToAdd = endereco.listaVolumes.filter(f => !currentVolumes.map(i => i.idVolume).includes(f.idVolume))

                    state.lista!
                    .find(f => f.idLista === endereco.idLista)!.listaEnderecos
                    .find(f => f.idRemetente === endereco.idRemetente)!.listaVolumes = [...currentVolumes, ...volumesToAdd]
                }else{
                    state.lista!
                    .find(f => f.idLista === endereco.idLista)!.listaEnderecos = [...currentLista.listaEnderecos, endereco]
                }
            })

            state.lista = [...state.lista!]
        },

        updateListaEndereco: (state, action: PayloadAction<Endereco>) => {
            const listaToUpdate = state.lista!.find(f => f.idLista === action.payload.idLista)!
            
            if(!listaToUpdate.listaEnderecos.map(i => i.idRemetente).includes(action.payload.idRemetente)){
                state.lista!.find(f => f.idLista === action.payload.idLista)!.listaEnderecos = [...listaToUpdate.listaEnderecos, action.payload]
            }

            state.lista = [...state.lista!]
        },
        
        addListaEnderecos: (state, action: PayloadAction<Endereco[]>) => {
            const listaToUpdate = state.lista!.find(f => f.idLista === action.payload[0].idLista)!
            const enderecosToAdd = action.payload.filter(f => !listaToUpdate.listaEnderecos.map(i => i.idRemetente).includes(f.idRemetente))

            if(enderecosToAdd && enderecosToAdd.length > 0){
                state.lista!.find(f => f.idLista === action.payload[0].idLista)!.listaEnderecos = [...listaToUpdate.listaEnderecos, ...enderecosToAdd]
            }

            state.lista = [...state.lista!]
        },
        addListaVolumes: (state, action: PayloadAction<VolumeAtualizado[]>) => {
            action.payload.forEach(lista => {
                const enderecoToUpdate = state.lista!.find(f => f.idLista === lista.idLista)!.listaEnderecos.find(f => f.idRemetente === lista.idRemetente)!
                const volumesToAdd = lista.listaVolumes.filter(f => !enderecoToUpdate.listaVolumes.map(i => i.idVolume).includes(f.idVolume))
                const formatedVolumes = volumesToAdd.map(volume => createVolume(volume.idVolume, lista.idLista, volume.etiqueta))

                if(volumesToAdd && volumesToAdd.length > 0){
                    state.lista!
                    .find(f => f.idLista === lista.idLista)!.listaEnderecos
                    .find(f => f.idRemetente === lista.idRemetente)!.listaVolumes = [...enderecoToUpdate.listaVolumes, ...formatedVolumes]
                }
            })
            
            state.lista = [...state.lista!]
        },
        
        scanEnderecoVolume: (state, action: PayloadAction<string>) => {
            const current = state.lista!.find(f => f.idLista === state.currentSolicitacao!.idLista)!.listaEnderecos.find(f => f.idLista === state.currentSolicitacao!.idLista && f.idRemetente === state.currentSolicitacao!.idRemetente)!
            const volumeIndex = current!.listaVolumes.findIndex(volume => volume.etiqueta === action.payload)!

            state.lista!
            .find(f => f.idLista === current.idLista)!.listaEnderecos
            .find(f => f.idLista === current.idLista && f.idRemetente === current.idRemetente)!.listaVolumes[volumeIndex].dtLeituraFirstMile = isoDateTime()

            state.lista = [...state.lista!]
        },

        resetLista: (state) => {
            state.lista = null
            state.oldLista = null
            state.filteredEnderecos = null
            state.currentLista = null
            state.currentSolicitacao = null
        },

        setLoadingNewLista: (state, action: PayloadAction<boolean>) => {
            state.loadingNewLista = action.payload
        },
    }
})

export const { 
    setLista, setOldLista, setFilteredEndereco,
    setCurrentLista, setCurrentSolicitacao,
    scanEnderecoVolume,
    updateListas, updateListaEndereco, updateListaSituacao, updateEnderecoSituacao, updateListaVolumes, updateListaEnderecoSituacao,
    addListaEnderecos, addListaVolumes,
    setLoadingNewLista,
    resetLista,
} = listaSlice.actions
export default listaSlice.reducer