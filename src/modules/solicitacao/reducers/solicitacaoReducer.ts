import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Solicitacao } from "../interfaces/Solicitacao"

interface State {
    solicitacoes: Solicitacao[] | null
    oldSolicitacoes: Solicitacao[] | null
    filteredSolicitacoes: Solicitacao[] | null
    
    currentSolicitacao: Solicitacao | null
}

const initialState: State = {
    solicitacoes: null,
    oldSolicitacoes: null,
    filteredSolicitacoes: null,
    currentSolicitacao: null,
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
    }
})

export const { setSolicitacoes, setOldSolicitacoes, setFilteredSolicitacoes, setCurrentSolicitacao, resetSolicitacoes, updateSolicitacao } = solicitacaoSlice.actions
export default solicitacaoSlice.reducer