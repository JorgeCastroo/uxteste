import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ResponseDefault, ResponsePattern } from "../../../utils/response/types"
import { responseInitialValues } from '../../../utils/response'
import { AppVersion } from "../interfaces/AppVersion"

interface State {
    requestAppVersion: ResponseDefault<AppVersion>
}

const initialState: State = {
    requestAppVersion: responseInitialValues,
}

const requestsAppSlice = createSlice({
    name: 'requestApp',
    initialState,
    reducers: {
        setRequestAppVersionData: (state, action: PayloadAction<ResponsePattern<AppVersion>>) => {
            state.requestAppVersion.data = action.payload
            state.requestAppVersion.loading = false
            state.requestAppVersion.error = false
        },
        setRequestAppVersionLoading: (state) => {
            state.requestAppVersion.loading = true
            state.requestAppVersion.error = false
        },
        setRequestAppVersionError: (state) => {
            state.requestAppVersion.loading = false
            state.requestAppVersion.error = true
        },
        setRequestAppVersionMessage: (state, action: PayloadAction<string>) => {
            state.requestAppVersion.message = action.payload
        },
        resetRequestAppVersion: (state) => {
            state.requestAppVersion = {...responseInitialValues}
        },
    }
})

export const {
    setRequestAppVersionData, setRequestAppVersionLoading, setRequestAppVersionError, setRequestAppVersionMessage, resetRequestAppVersion,
} = requestsAppSlice.actions
export default requestsAppSlice.reducer