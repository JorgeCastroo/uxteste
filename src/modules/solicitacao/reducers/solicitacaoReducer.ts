import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Solicitacao } from "../interfaces/Solicitacao"

interface State {
    solicitacoes: Solicitacao[] | null
    oldSolicitacoes: Solicitacao[] | null
    filteredSolicitacoes: Solicitacao[] | null
    
    currentSolicitacao: Solicitacao | null

    loadingRoute: boolean
}

const initialState: State = {
    solicitacoes: null,
    oldSolicitacoes: null,
    filteredSolicitacoes: null,
    currentSolicitacao: null,

    loadingRoute: false,
}

const solicitacaoSlice = createSlice({
    name: 'solicitacao',
    initialState,
    reducers: {
        setSolicitacoes: (state, action: PayloadAction<Solicitacao[]>) => {
            state.solicitacoes = action.payload
        },
        setOldSolicitacoes: (state, action: PayloadAction<Solicitacao[]>) => {
            state.oldSolicitacoes = action.payload
        },
        setFilteredSolicitacoes: (state, action: PayloadAction<Solicitacao[] | null>) => {
            state.filteredSolicitacoes = action.payload
        },
        setCurrentSolicitacao: (state, action: PayloadAction<Solicitacao>) => {
            state.currentSolicitacao = action.payload
        },

        updateSolicitacao: (state, action: PayloadAction<Solicitacao>) => {

        },

        resetSolicitacoes: (state) => {
            state.solicitacoes = null
            state.oldSolicitacoes = null
            state.filteredSolicitacoes = null
            state.currentSolicitacao = null
        },

        setLoadingRoute: (state, action: PayloadAction<boolean>) => {
            state.loadingRoute = action.payload
        },
    }
})

export const { setSolicitacoes, setOldSolicitacoes, setFilteredSolicitacoes, setCurrentSolicitacao, resetSolicitacoes, updateSolicitacao, setLoadingRoute } = solicitacaoSlice.actions
export default solicitacaoSlice.reducer