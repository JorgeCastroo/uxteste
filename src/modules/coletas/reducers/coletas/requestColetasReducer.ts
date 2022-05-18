import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coletas } from "./coletas";

interface State {
    requestColeta: {
        loading: boolean;
        data: Coletas[] | null;
        erro: boolean | null;
        aceita: boolean;
        aceitaData: object | null;
    }
}

const initialState: State = {
    requestColeta: {
        loading: true,
        data: null,
        erro: null,
        aceita: false,
        aceitaData: null,
    }
}

const requestColetas = createSlice({
    name: "requestColetas",
    initialState,
    reducers: {
        setRequestColetasData: (state, action: PayloadAction<any>) => {
            state.requestColeta.data = action.payload
            state.requestColeta.loading = false
            state.requestColeta.erro = false
        },
        setRequestColetasLoading: (state) => {
            state.requestColeta.loading = true
            state.requestColeta.erro = false
        },
        setRequestAcceptColetaData: (state, action: PayloadAction<any>) => {
            state.requestColeta.aceitaData = action.payload
            state.requestColeta.aceita = true
        },
        setRequestRefuseColetaData: (state, action: PayloadAction<any>) => {
            state.requestColeta.aceitaData = action.payload
            state.requestColeta.aceita = false
        }
    }
})

export const { setRequestColetasData, setRequestColetasLoading, setRequestAcceptColetaData, setRequestRefuseColetaData } = requestColetas.actions
export default requestColetas.reducer