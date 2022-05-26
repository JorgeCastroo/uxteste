import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Lista } from "../../interfaces/Lista"
import { ResponseDefault, ResponsePattern } from "../../../../utils/response/types"
import { responseInitialValues } from '../../../../utils/response'

interface State {
    requestGetLista: ResponseDefault<Lista[]>
    requestSaveLista: ResponseDefault<any>
    requestStartReceivingLista: ResponseDefault<any>
}

const initialState: State = {
    requestGetLista: responseInitialValues,
    requestSaveLista: responseInitialValues,
    requestStartReceivingLista: responseInitialValues,
}

const requestListaSlice = createSlice({
    name: 'requestLista',
    initialState,
    reducers: {
        setRequestGetListaData: (state, action: PayloadAction<ResponsePattern<Lista[]>>) => {
            state.requestGetLista.data = action.payload
            state.requestGetLista.loading = false
            state.requestGetLista.error = false
        },
        setRequestGetListaLoading: (state) => {
            state.requestGetLista.loading = true
            state.requestGetLista.error = false
        },
        setRequestGetListaError: (state) => {
            state.requestGetLista.loading = false
            state.requestGetLista.error = true
        },
        setRequestGetListaMessage: (state, action: PayloadAction<string>) => {
            state.requestGetLista.message = action.payload
        },
        resetRequestGetLista: (state) => {
            state.requestGetLista = {...responseInitialValues}
        },

        setRequestSaveListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestSaveLista.data = action.payload
            state.requestSaveLista.loading = false
            state.requestSaveLista.error = false
        },
        setRequestSaveListaLoading: (state) => {
            state.requestSaveLista.loading = true
            state.requestSaveLista.error = false
        },
        setRequestSaveListaError: (state) => {
            state.requestSaveLista.loading = false
            state.requestSaveLista.error = true
        },
        setRequestSaveListaMessage: (state, action: PayloadAction<string>) => {
            state.requestSaveLista.message = action.payload
        },
        resetRequestSaveLista: (state) => {
            state.requestSaveLista = {...responseInitialValues}
        },

        setRequestStartReceivingListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestStartReceivingLista.data = action.payload
            state.requestStartReceivingLista.loading = false
            state.requestStartReceivingLista.error = false
        },
        setRequestStartReceivingListaLoading: (state) => {
            state.requestStartReceivingLista.loading = true
            state.requestStartReceivingLista.error = false
        },
        setRequestStartReceivingListaError: (state) => {
            state.requestStartReceivingLista.loading = false
            state.requestStartReceivingLista.error = true
        },
        setRequestStartReceivingListaMessage: (state, action: PayloadAction<string>) => {
            state.requestStartReceivingLista.message = action.payload
        },
        resetRequestStartReceivingLista: (state) => {
            state.requestStartReceivingLista = {...responseInitialValues}
        },
    }
})

export const {
    setRequestGetListaLoading, setRequestGetListaData, setRequestGetListaError, setRequestGetListaMessage, resetRequestGetLista,
    setRequestSaveListaLoading, setRequestSaveListaData, setRequestSaveListaError, setRequestSaveListaMessage, resetRequestSaveLista,
    setRequestStartReceivingListaLoading, setRequestStartReceivingListaData, setRequestStartReceivingListaError, setRequestStartReceivingListaMessage, resetRequestStartReceivingLista,
} = requestListaSlice.actions
export default requestListaSlice.reducer