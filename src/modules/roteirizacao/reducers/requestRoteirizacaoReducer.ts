import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"
import { ResponseDefault, ResponsePattern } from "../../../utils/response/types"
import { responseInitialValues } from "../../../utils/response"

interface State {
    requestGetRoteirizacao: ResponseDefault<RoteirizacaoResponse[]>
}

const initialState: State = {
    requestGetRoteirizacao: responseInitialValues,
}

const requestRoteirizacaoSlice = createSlice({
    name: 'requestRoteirizacao',
    initialState,
    reducers: {
        setRequestGetRoteirizacaoData: (state, action: PayloadAction<ResponsePattern<RoteirizacaoResponse[]>>) => {
            state.requestGetRoteirizacao.data = action.payload
            state.requestGetRoteirizacao.loading = false
            state.requestGetRoteirizacao.error = false
        },
        setRequestGetRoteirizacaoLoading: (state) => {
            state.requestGetRoteirizacao.loading = true
            state.requestGetRoteirizacao.error = false
        },
        setRequestGetRoteirizacaoError: (state) => {
            state.requestGetRoteirizacao.loading = false
            state.requestGetRoteirizacao.error = true
        },
        setRequestGetRoteirizacaoMessage: (state, action: PayloadAction<string>) => {
            state.requestGetRoteirizacao.message = action.payload
        },
        resetRequestGetRoteirizacao: (state) => {
            state.requestGetRoteirizacao = {...responseInitialValues}
        },
    }
})

export const { 
    setRequestGetRoteirizacaoData, setRequestGetRoteirizacaoLoading, setRequestGetRoteirizacaoError, setRequestGetRoteirizacaoMessage, resetRequestGetRoteirizacao
} = requestRoteirizacaoSlice.actions
export default requestRoteirizacaoSlice.reducer