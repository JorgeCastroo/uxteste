import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../types/data";

interface State {
    requestColeta: {
        loading: boolean;
        loadingColetasAceitas: boolean;
        data: object | null;
        erro: boolean | null;
        coletasAceitasData: Data | null;
    }
}

const initialState: State = {
    requestColeta: {
        loading: true,
        loadingColetasAceitas: false,
        data: null,
        erro: null,
        coletasAceitasData: null
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
        setRequestColetasAceitasData: (state, action: PayloadAction<any>) => {
            state.requestColeta.coletasAceitasData = action.payload
            state.requestColeta.loadingColetasAceitas = false
        },
        setRequestAcceptColetasLoading: (state) => {
            state.requestColeta.loadingColetasAceitas = true
        },
    }
})

export const { setRequestColetasData, setRequestColetasLoading, setRequestColetasAceitasData, setRequestAcceptColetasLoading } = requestColetas.actions
export default requestColetas.reducer