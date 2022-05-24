import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coletas, Volumes } from "../../types/coletas";
interface State {
    coletas: Coletas[],
    loadingSendColeta: boolean,
    coletasAprovadas: Coletas[],
    coletasReprovadas: Coletas[],
    idsColetasAprovadas: number[],
    idsColetasReprovadas: number[],
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
    loadingSendColeta: false,
    coletasAprovadas: [],
    coletasReprovadas: [],
    idsColetasAprovadas: [],
    idsColetasReprovadas: [],
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
        setLoadingSendColeta: (state, action: PayloadAction<any>) => {
            state.loadingSendColeta = action.payload
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
        setIdsColetas: (state, action: PayloadAction<any>) => {
            if (!state.idsColetasAprovadas.includes(action.payload) && !state.idsColetasReprovadas.includes(action.payload)) {
                state.idsColetasAprovadas.push(action.payload)
            } else if (state.idsColetasReprovadas.includes(action.payload)) {
                const removedIdIndex = state.idsColetasReprovadas.indexOf(action.payload)
                state.idsColetasReprovadas.splice(removedIdIndex, 1)
                state.idsColetasAprovadas.push(action.payload)
            }
        },
        setRemoveIdsColetas: (state, action: PayloadAction<any>) => {
            if (!state.idsColetasReprovadas.includes(action.payload) && !state.idsColetasAprovadas.includes(action.payload)) {
                state.idsColetasReprovadas.push(action.payload)
            } else if (state.idsColetasAprovadas.includes(action.payload)) {
                const aprovedIdIndex = state.idsColetasAprovadas.indexOf(action.payload)
                state.idsColetasAprovadas.splice(aprovedIdIndex, 1)
                state.idsColetasReprovadas.push(action.payload)
            }
        },
    }
})

export const {
    setColetas,
    setLoadingSendColeta,
    setIdsColetas,
    setRemoveIdsColetas,
    setColetasAprovadas,
    setColetasReprovadas,
    setRemoveAllColetas,
    setAcceptAllColetas } = coletasSlice.actions
export default coletasSlice.reducer