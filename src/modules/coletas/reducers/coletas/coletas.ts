import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lista } from "../../../solicitacao/interfaces/Lista";
interface State {
    coletas: Lista[],
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
        setColetas: (state, action: PayloadAction<Lista[]>) => {
            state.coletas = action.payload
        },
        setloadingColetasAprovadas: (state, action: PayloadAction<any>) => {
            state.loadingColetasAprovadas = action.payload
        },
        setResetColetasAprovadas: (state) => {
            state.coletasAprovadas = []
        },

        setColetasAprovadas: (state, action: PayloadAction<Lista>) => {
            if(!state.coletasAprovadas.some(item => item.idRemetente === action.payload.idRemetente)){
                if(state.coletasReprovadas.some(item => item.idRemetente === action.payload.idRemetente)) state.coletasReprovadas.splice(state.coletasReprovadas.findIndex(id => id.idRemetente === action.payload.idRemetente), 1)
                state.coletasAprovadas.push(action.payload)
            }
        },
        setColetasReprovadas: (state, action: PayloadAction<Lista>) => {
            if(!state.coletasReprovadas.some(item => item.idRemetente === action.payload.idRemetente)){
                if(state.coletasAprovadas.some(item => item.idRemetente === action.payload.idRemetente)) state.coletasAprovadas.splice(state.coletasAprovadas.findIndex(id => id.idRemetente === action.payload.idRemetente), 1)
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
    setloadingColetasAprovadas,
    setColetasAprovadas, setResetColetasAprovadas,
    setColetasReprovadas,
    setRemoveAllColetas,
    setAcceptAllColetas } = coletasSlice.actions
export default coletasSlice.reducer