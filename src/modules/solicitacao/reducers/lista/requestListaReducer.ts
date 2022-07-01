import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Lista } from "../../interfaces/Lista"
import { ListaAtualizada } from "../../interfaces/ListaAtualizada"
import { ResponseDefault, ResponsePattern } from "../../../../utils/response/types"
import { responseInitialValues } from '../../../../utils/response'

interface State {
    requestGetLista: ResponseDefault<Lista[]>
    requestSaveLista: ResponseDefault<any>
    requestCancelLista: ResponseDefault<any>
    requestStartReceivingLista: ResponseDefault<any>
    requestUpdateLista: ResponseDefault<ListaAtualizada[]>
    requestConfirmUpdateLista: ResponseDefault<any>
    requestSendLeituraLista: ResponseDefault<any>
}

const initialState: State = {
    requestGetLista: responseInitialValues,
    requestSaveLista: responseInitialValues,
    requestCancelLista: responseInitialValues,
    requestStartReceivingLista: responseInitialValues,
    requestUpdateLista: responseInitialValues,
    requestConfirmUpdateLista: responseInitialValues,
    requestSendLeituraLista: responseInitialValues,
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

        setRequestCancelListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestCancelLista.data = action.payload
            state.requestCancelLista.loading = false
            state.requestCancelLista.error = false
        },
        setRequestCancelListaLoading: (state) => {
            state.requestCancelLista.loading = true
            state.requestCancelLista.error = false
        },
        setRequestCancelListaError: (state) => {
            state.requestCancelLista.loading = false
            state.requestCancelLista.error = true
        },
        setRequestCancelListaMessage: (state, action: PayloadAction<string>) => {
            state.requestCancelLista.message = action.payload
        },
        resetRequestCancelLista: (state) => {
            state.requestCancelLista = {...responseInitialValues}
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

        setRequestUpdateListaData: (state, action: PayloadAction<ResponsePattern<ListaAtualizada[]>>) => {
            state.requestUpdateLista.data = action.payload
            state.requestUpdateLista.loading = false
            state.requestUpdateLista.error = false
        },
        setRequestUpdateListaLoading: (state) => {
            state.requestUpdateLista.loading = true
            state.requestUpdateLista.error = false
        },
        setRequestUpdateListaError: (state) => {
            state.requestUpdateLista.loading = false
            state.requestUpdateLista.error = true
        },
        setRequestUpdateListaMessage: (state, action: PayloadAction<string>) => {
            state.requestUpdateLista.message = action.payload
        },
        resetRequestUpdateLista: (state) => {
            state.requestUpdateLista = {...responseInitialValues}
        },

        setRequestConfirmUpdateListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestConfirmUpdateLista.data = action.payload
            state.requestConfirmUpdateLista.loading = false
            state.requestConfirmUpdateLista.error = false
        },
        setRequestConfirmUpdateListaLoading: (state) => {
            state.requestConfirmUpdateLista.loading = true
            state.requestConfirmUpdateLista.error = false
        },
        setRequestConfirmUpdateListaError: (state) => {
            state.requestConfirmUpdateLista.loading = false
            state.requestConfirmUpdateLista.error = true
        },
        setRequestConfirmUpdateListaMessage: (state, action: PayloadAction<string>) => {
            state.requestConfirmUpdateLista.message = action.payload
        },
        resetRequestConfirmUpdateLista: (state) => {
            state.requestConfirmUpdateLista = {...responseInitialValues}
        },

        setRequestSendLeituraListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestSendLeituraLista.data = action.payload
            state.requestSendLeituraLista.loading = false
            state.requestSendLeituraLista.error = false
        },
        setRequestSendLeituraListaLoading: (state) => {
            state.requestSendLeituraLista.loading = true
            state.requestSendLeituraLista.error = false
        },
        setRequestSendLeituraListaError: (state) => {
            state.requestSendLeituraLista.loading = false
            state.requestSendLeituraLista.error = true
        },
        setRequestSendLeituraListaMessage: (state, action: PayloadAction<string>) => {
            state.requestSendLeituraLista.message = action.payload
        },
        resetRequestSendLeituraLista: (state) => {
            state.requestSendLeituraLista = {...responseInitialValues}
        },
    }
})

export const {
    setRequestGetListaLoading, setRequestGetListaData, setRequestGetListaError, setRequestGetListaMessage, resetRequestGetLista,
    setRequestSaveListaLoading, setRequestSaveListaData, setRequestSaveListaError, setRequestSaveListaMessage, resetRequestSaveLista,
    setRequestCancelListaLoading, setRequestCancelListaData, setRequestCancelListaError, setRequestCancelListaMessage, resetRequestCancelLista,
    setRequestStartReceivingListaLoading, setRequestStartReceivingListaData, setRequestStartReceivingListaError, setRequestStartReceivingListaMessage, resetRequestStartReceivingLista,
    setRequestUpdateListaLoading, setRequestUpdateListaData, setRequestUpdateListaError, setRequestUpdateListaMessage, resetRequestUpdateLista,
    setRequestConfirmUpdateListaLoading, setRequestConfirmUpdateListaData, setRequestConfirmUpdateListaError, setRequestConfirmUpdateListaMessage, resetRequestConfirmUpdateLista,
    setRequestSendLeituraListaLoading, setRequestSendLeituraListaData, setRequestSendLeituraListaError, setRequestSendLeituraListaMessage, resetRequestSendLeituraLista,
} = requestListaSlice.actions
export default requestListaSlice.reducer