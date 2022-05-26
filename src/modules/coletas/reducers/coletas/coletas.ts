import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coletas } from "../../types/coletas";
interface State {
    coletas: Coletas[],
    loadingColetasAprovadas: boolean,
    coletasAprovadas: Coletas[],
    coletasReprovadas: Coletas[],
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
        setloadingColetasAprovadas: (state, action: PayloadAction<any>) => {
            state.loadingColetasAprovadas = action.payload
        },
        setColetasAprovadas: (state, action: PayloadAction<any>) => {
            if (!state.coletasReprovadas.some(item => item.id === action.payload.id) && !state.coletasAprovadas.some(item => item.id === action.payload.id)) {
                state.coletasAprovadas.push(action.payload)
            } else if (state.coletasReprovadas.some(item => item.id === action.payload.id)) {
                const index = state.coletasReprovadas.findIndex(id => id.id === action.payload.id)
                state.coletasReprovadas.splice(index, 1)
                state.coletasAprovadas.push(action.payload)
            }
        },
        setColetasReprovadas: (state, action: PayloadAction<any>) => {
            if (!state.coletasAprovadas.some(item => item.id === action.payload.id) && !state.coletasReprovadas.some(item => item.id === action.payload.id)) {
                state.coletasReprovadas.push(action.payload)
            } else if (state.coletasAprovadas.some(item => item.id === action.payload.id)) {
                const index = state.coletasAprovadas.findIndex(id => id.id === action.payload.id)
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
    setloadingColetasAprovadas,
    setColetasAprovadas,
    setColetasReprovadas,
    setRemoveAllColetas,
    setAcceptAllColetas } = coletasSlice.actions
export default coletasSlice.reducer