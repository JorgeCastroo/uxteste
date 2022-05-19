import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserData } from "../../../../interfaces/UserData"
import { ResponseDefault, ResponsePattern, ResponseStatesPattern } from "../../../../utils/response/types"
import { responseInitialValues } from "../../../../utils/response"

interface State {
    requestSendAuthLogin: ResponseStatesPattern<UserData>
}

const initialState: State = {
    requestSendAuthLogin: responseInitialValues
}

const requestSendAuthLoginSlice = createSlice({
    name: 'requestSendAuthLogin',
    initialState,
    reducers: {
        setRequestSendAuthLoginLoading: (state) => {
            state.requestSendAuthLogin.loading = true
            state.requestSendAuthLogin.error = false
        },
        setRequestSendAuthLoginData: (state, action: PayloadAction<UserData>) => {
            state.requestSendAuthLogin.data = action.payload
            state.requestSendAuthLogin.loading = false
            state.requestSendAuthLogin.error = false
        },
        setRequestSendAuthLoginMessage: (state, action: PayloadAction<string>) => {
            state.requestSendAuthLogin.message = action.payload
        },
        setRequestSendAuthLoginError: (state) => {
            state.requestSendAuthLogin.loading = false
            state.requestSendAuthLogin.error = true
        },
    }
})

export const {
    setRequestSendAuthLoginLoading, setRequestSendAuthLoginData, setRequestSendAuthLoginMessage, setRequestSendAuthLoginError
} = requestSendAuthLoginSlice.actions
export default requestSendAuthLoginSlice.reducer