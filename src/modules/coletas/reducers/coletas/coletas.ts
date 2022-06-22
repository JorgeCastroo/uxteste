import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lista } from "../../../solicitacao/interfaces/Lista";
interface State {
    coletas: Lista[] | null,
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
    coletas: null,
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
        setColetas: (state, action: PayloadAction<Lista[] | null>) => {
            state.coletas = action.payload
        },
        setLoadingColetasAprovadas: (state, action: PayloadAction<any>) => {
            state.loadingColetasAprovadas = action.payload
        },
        setResetColetasAprovadas: (state) => {
            state.coletasAprovadas = []
        },

        setColetasAprovadas: (state, action: PayloadAction<Lista>) => {
            if(!state.coletasAprovadas.some(item => item.idLista === action.payload.idLista)){
                if(state.coletasReprovadas.some(item => item.idLista === action.payload.idLista)) state.coletasReprovadas.splice(state.coletasReprovadas.findIndex(id => id.idLista === action.payload.idLista), 1)
                state.coletasAprovadas.push(action.payload)
            }
        },
        setColetasReprovadas: (state, action: PayloadAction<Lista>) => {
            if(!state.coletasReprovadas.some(item => item.idLista === action.payload.idLista)){
                if(state.coletasAprovadas.some(item => item.idLista === action.payload.idLista)) state.coletasAprovadas.splice(state.coletasAprovadas.findIndex(id => id.idLista === action.payload.idLista), 1)
                state.coletasReprovadas.push(action.payload)
            }
        },

        setAcceptAllColetas: (state, action: PayloadAction<Lista[]>) => {
            state.coletasAprovadas = action.payload
            state.coletasReprovadas = []
        },
        setRemoveAllColetas: (state, action: PayloadAction<Lista[]>) => {
            state.coletasReprovadas = action.payload
            state.coletasAprovadas = []
        },
    }
})

export const {
    setColetas,
    setLoadingColetasAprovadas,
    setColetasAprovadas, setResetColetasAprovadas,
    setColetasReprovadas,
    setRemoveAllColetas,
    setAcceptAllColetas } = coletasSlice.actions
export default coletasSlice.reducer