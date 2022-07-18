import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Lista } from "../../interfaces/Lista"
import { ListaAtualizada } from "../../interfaces/ListaAtualizada"
import { VolumeAtualizado } from "../../interfaces/VolumeAtualizado"
import { ResponseDefault, ResponsePattern } from "../../../../utils/response/types"
import { responseInitialValues } from '../../../../utils/response'

interface State {
    requestGetLista: ResponseDefault<Lista[]>
    requestSaveLista: ResponseDefault<any>
    requestSendLeituraLista: ResponseDefault<any>
    requestCloseLista: ResponseDefault<any>
    requestCancelLista: ResponseDefault<any>
    requestCancelEnderecoLista: ResponseDefault<any>
    requestStartReceivingLista: ResponseDefault<any>
    requestStartReceivingEndereco: ResponseDefault<any>
    
    requestUpdateLista: ResponseDefault<ListaAtualizada[]>
    requestConfirmUpdateLista: ResponseDefault<any>

    requestUpdateVolume: ResponseDefault<VolumeAtualizado[]>
    requestConfirmUpdateVolume: ResponseDefault<any>
}

const initialState: State = {
    requestGetLista: responseInitialValues,
    requestSaveLista: responseInitialValues,
    requestCancelLista: responseInitialValues,
    requestStartReceivingLista: responseInitialValues,
    requestSendLeituraLista: responseInitialValues,
    requestCancelEnderecoLista: responseInitialValues,
    requestStartReceivingEndereco: responseInitialValues,
    requestCloseLista: responseInitialValues,
    
    requestUpdateLista: responseInitialValues,
    requestConfirmUpdateLista: responseInitialValues,
    
    requestUpdateVolume: responseInitialValues,
    requestConfirmUpdateVolume: responseInitialValues,
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

        setRequestUpdateVolumeData: (state, action: PayloadAction<ResponsePattern<VolumeAtualizado[]>>) => {
            state.requestUpdateVolume.data = action.payload
            state.requestUpdateVolume.loading = false
            state.requestUpdateVolume.error = false
        },
        setRequestUpdateVolumeLoading: (state) => {
            state.requestUpdateVolume.loading = true
            state.requestUpdateVolume.error = false
        },
        setRequestUpdateVolumeError: (state) => {
            state.requestUpdateVolume.loading = false
            state.requestUpdateVolume.error = true
        },
        setRequestUpdateVolumeMessage: (state, action: PayloadAction<string>) => {
            state.requestUpdateVolume.message = action.payload
        },
        resetRequestUpdateVolume: (state) => {
            state.requestUpdateVolume = {...responseInitialValues}
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

        setRequestConfirmUpdateVolumeData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestConfirmUpdateVolume.data = action.payload
            state.requestConfirmUpdateVolume.loading = false
            state.requestConfirmUpdateVolume.error = false
        },
        setRequestConfirmUpdateVolumeLoading: (state) => {
            state.requestConfirmUpdateVolume.loading = true
            state.requestConfirmUpdateVolume.error = false
        },
        setRequestConfirmUpdateVolumeError: (state) => {
            state.requestConfirmUpdateVolume.loading = false
            state.requestConfirmUpdateVolume.error = true
        },
        setRequestConfirmUpdateVolumeMessage: (state, action: PayloadAction<string>) => {
            state.requestConfirmUpdateVolume.message = action.payload
        },
        resetRequestConfirmUpdateVolume: (state) => {
            state.requestConfirmUpdateVolume = {...responseInitialValues}
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

        setRequestCancelEnderecoListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestCancelEnderecoLista.data = action.payload
            state.requestCancelEnderecoLista.loading = false
            state.requestCancelEnderecoLista.error = false
        },
        setRequestCancelEnderecoListaLoading: (state) => {
            state.requestCancelEnderecoLista.loading = true
            state.requestCancelEnderecoLista.error = false
        },
        setRequestCancelEnderecoListaError: (state) => {
            state.requestCancelEnderecoLista.loading = false
            state.requestCancelEnderecoLista.error = true
        },
        setRequestCancelEnderecoListaMessage: (state, action: PayloadAction<string>) => {
            state.requestCancelEnderecoLista.message = action.payload
        },
        resetRequestCancelEnderecoLista: (state) => {
            state.requestCancelEnderecoLista = {...responseInitialValues}
        },

        setRequestStartReceivingEnderecoData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestStartReceivingEndereco.data = action.payload
            state.requestStartReceivingEndereco.loading = false
            state.requestStartReceivingEndereco.error = false
        },
        setRequestStartReceivingEnderecoLoading: (state) => {
            state.requestStartReceivingEndereco.loading = true
            state.requestStartReceivingEndereco.error = false
        },
        setRequestStartReceivingEnderecoError: (state) => {
            state.requestStartReceivingEndereco.loading = false
            state.requestStartReceivingEndereco.error = true
        },
        setRequestStartReceivingEnderecoMessage: (state, action: PayloadAction<string>) => {
            state.requestStartReceivingEndereco.message = action.payload
        },
        resetRequestStartReceivingEndereco: (state) => {
            state.requestStartReceivingEndereco = {...responseInitialValues}
        },

        setRequestCloseListaData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestCloseLista.data = action.payload
            state.requestCloseLista.loading = false
            state.requestCloseLista.error = false
        },
        setRequestCloseListaLoading: (state) => {
            state.requestCloseLista.loading = true
            state.requestCloseLista.error = false
        },
        setRequestCloseListaError: (state) => {
            state.requestCloseLista.loading = false
            state.requestCloseLista.error = true
        },
        setRequestCloseListaMessage: (state, action: PayloadAction<string>) => {
            state.requestCloseLista.message = action.payload
        },
        resetRequestCloseLista: (state) => {
            state.requestCloseLista = {...responseInitialValues}
        },
    }
})

export const {
    setRequestGetListaLoading, setRequestGetListaData, setRequestGetListaError, setRequestGetListaMessage, resetRequestGetLista,
    setRequestSaveListaLoading, setRequestSaveListaData, setRequestSaveListaError, setRequestSaveListaMessage, resetRequestSaveLista,
    setRequestCancelListaLoading, setRequestCancelListaData, setRequestCancelListaError, setRequestCancelListaMessage, resetRequestCancelLista,
    setRequestStartReceivingListaLoading, setRequestStartReceivingListaData, setRequestStartReceivingListaError, setRequestStartReceivingListaMessage, resetRequestStartReceivingLista,
    setRequestUpdateListaLoading, setRequestUpdateListaData, setRequestUpdateListaError, setRequestUpdateListaMessage, resetRequestUpdateLista,
    setRequestUpdateVolumeLoading, setRequestUpdateVolumeData, setRequestUpdateVolumeError, setRequestUpdateVolumeMessage, resetRequestUpdateVolume,
    setRequestConfirmUpdateListaLoading, setRequestConfirmUpdateListaData, setRequestConfirmUpdateListaError, setRequestConfirmUpdateListaMessage, resetRequestConfirmUpdateLista,
    setRequestConfirmUpdateVolumeLoading, setRequestConfirmUpdateVolumeData, setRequestConfirmUpdateVolumeError, setRequestConfirmUpdateVolumeMessage, resetRequestConfirmUpdateVolume,
    setRequestSendLeituraListaLoading, setRequestSendLeituraListaData, setRequestSendLeituraListaError, setRequestSendLeituraListaMessage, resetRequestSendLeituraLista,
    setRequestCancelEnderecoListaLoading, setRequestCancelEnderecoListaData, setRequestCancelEnderecoListaError, setRequestCancelEnderecoListaMessage, resetRequestCancelEnderecoLista,
    setRequestStartReceivingEnderecoLoading, setRequestStartReceivingEnderecoData, setRequestStartReceivingEnderecoError, setRequestStartReceivingEnderecoMessage, resetRequestStartReceivingEndereco,
    setRequestCloseListaData, setRequestCloseListaLoading, setRequestCloseListaError, setRequestCloseListaMessage, resetRequestCloseLista,
} = requestListaSlice.actions
export default requestListaSlice.reducer