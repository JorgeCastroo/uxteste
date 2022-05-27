import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ResponseDefault, ResponsePattern, ResponseStatesPattern } from "../../../../utils/response/types"
import { responseInitialValues } from "../../../../utils/response"

interface State {
    requestSendAuthCode: ResponseStatesPattern<any>
}

const initialState: State = {
    requestSendAuthCode: responseInitialValues
}

const requestAuthCodeSlice = createSlice({
    name: 'requestSendAuthCode',
    initialState,
    reducers: {
        setRequestSendAuthCodeLoading: (state) => {
            state.requestSendAuthCode.loading = true
            state.requestSendAuthCode.error = false
        },
        setRequestSendAuthCodeData: (state, action: PayloadAction<any>) => {
            state.requestSendAuthCode.data = action.payload
            state.requestSendAuthCode.loading = false
            state.requestSendAuthCode.error = false
        },
        setRequestSendAuthCodeMessage: (state, action: PayloadAction<string>) => {
            state.requestSendAuthCode.message = action.payload
        },
        setRequestSendAuthCodeError: (state) => {
            state.requestSendAuthCode.loading = false
            state.requestSendAuthCode.error = true
        },
    }
})

export const {
    setRequestSendAuthCodeLoading, setRequestSendAuthCodeData, setRequestSendAuthCodeMessage, setRequestSendAuthCodeError
} = requestAuthCodeSlice.actions
export default requestAuthCodeSlice.reducer