import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coletas } from "./coletas";

interface State {
    requestVolumes: {
        loading: boolean;
        data: Coletas[] | null;
        erro: boolean | null;
        aceita: boolean;
        coletasAceitasData: object | null;
    }
}

const initialState: State = {
    requestVolumes: {
        loading: true,
        data: null,
        erro: null,
        aceita: false,
        coletasAceitasData: null,
    }
}

const requestVolumes = createSlice({
    name: "requestVolumes",
    initialState,
    reducers: {
        setRequestVolumes: (state, action: PayloadAction<any>) => {
            state.requestVolumes.data = action.payload
            state.requestVolumes.loading = false
            state.requestVolumes.erro = false
        },
        setRequestColetasLoading: (state) => {
            state.requestVolumes.loading = true
            state.requestVolumes.erro = false
        },
        setRequestAcceptColetaData: (state, action: PayloadAction<any>) => {
            state.requestVolumes.coletasAceitasData = action.payload
            state.requestVolumes.aceita = true
        },
        setRequestRefuseColetaData: (state, action: PayloadAction<any>) => {
            state.requestVolumes.coletasAceitasData = action.payload
            state.requestVolumes.aceita = false
        }
    }
})

export const { setRequestVolumes, setRequestColetasLoading, setRequestAcceptColetaData, setRequestRefuseColetaData } = requestVolumes.actions
export default requestVolumes.reducer