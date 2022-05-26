import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lista } from "../../../solicitacao/interfaces/Lista";
interface State {
    coletas: Lista[],
    erro: boolean,
    loadingColetasAprovadas: boolean,
    coletasAprovadas: Lista[],
    coletasReprovadas: Lista[],
    idStatusColetas: {
        ENVIADO: 1,
        APROVADO: 2,
        COLETANDO: 3,
        REPROVADO: 4,
        FINALIZADO: 5
    }
}

const initialState: State = {
    coletas: [],
    erro: false,
    loadingColetasAprovadas: false,
    coletasAprovadas: [],
    coletasReprovadas: [],
    idStatusColetas: {
        ENVIADO: 1,
        APROVADO: 2,
        COLETANDO: 3,
        REPROVADO: 4,
        FINALIZADO: 5
    }
}

const coletasSlice = createSlice({
    name: "coletas",
    initialState,
    reducers: {
        setColetas: (state, action: PayloadAction<any>) => {
            state.coletas = action.payload
        },
        setColetasErro: (state) => {
            state.erro = true
        },
        setLoadingColetasAprovadas: (state, action: PayloadAction<any>) => {
            state.loadingColetasAprovadas = action.payload
        },
        setColetasAprovadas: (state, action: PayloadAction<any>) => {
            if (!state.coletasReprovadas.some(item => item.idLista === action.payload.idLista) && !state.coletasAprovadas.some(item => item.idLista === action.payload.idLista)) {
                state.coletasAprovadas.push(action.payload)
            } else if (state.coletasReprovadas.some(item => item.idLista === action.payload.idLista)) {
                const index = state.coletasReprovadas.findIndex(id => id.idLista === action.payload.idLista)
                state.coletasReprovadas.splice(index, 1)
                state.coletasAprovadas.push(action.payload)
            }
        },
        setColetasReprovadas: (state, action: PayloadAction<any>) => {
            if (!state.coletasAprovadas.some(item => item.idLista === action.payload.idLista) && !state.coletasReprovadas.some(item => item.idLista === action.payload.idLista)) {
                state.coletasReprovadas.push(action.payload)
            } else if (state.coletasAprovadas.some(item => item.idLista === action.payload.idLista)) {
                const index = state.coletasAprovadas.findIndex(id => id.idLista === action.payload.idLista)
                state.coletasAprovadas.splice(index, 1)
                state.coletasReprovadas.push(action.payload)
            }
        },
        setAcceptAllColetas: (state, action: PayloadAction<any>) => {
            state.coletasAprovadas = action.payload
            state.coletasReprovadas = []
        },
        setRemoveAllColetas: (state, action: PayloadAction<any>) => {
            state.coletasReprovadas = action.payload
            state.coletasAprovadas = []
        },
    }
})

export const {
    setColetas,
    setColetasErro,
    setLoadingColetasAprovadas,
    setColetasAprovadas,
    setColetasReprovadas,
    setRemoveAllColetas,
    setAcceptAllColetas } = coletasSlice.actions
export default coletasSlice.reducer