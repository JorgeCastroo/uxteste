import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ResponseDefault, ResponsePattern } from "../../../utils/response/types"
import { responseInitialValues } from '../../../utils/response'
import { AppVersion } from "../interfaces/AppVersion"

interface State {
    requestAppVersion: ResponseDefault<AppVersion>
    requestAppLocation: ResponseDefault<any>
}

const initialState: State = {
    requestAppVersion: responseInitialValues,
    requestAppLocation: responseInitialValues,
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

        setRequestAppLocationData: (state, action: PayloadAction<ResponsePattern<any>>) => {
            state.requestAppLocation.data = action.payload
            state.requestAppLocation.loading = false
            state.requestAppLocation.error = false
        },
        setRequestAppLocationLoading: (state) => {
            state.requestAppLocation.loading = true
            state.requestAppLocation.error = false
        },
        setRequestAppLocationError: (state) => {
            state.requestAppLocation.loading = false
            state.requestAppLocation.error = true
        },
        setRequestAppLocationMessage: (state, action: PayloadAction<string>) => {
            state.requestAppLocation.message = action.payload
        },
        resetRequestAppLocation: (state) => {
            state.requestAppLocation = {...responseInitialValues}
        },
    }
})

export const {
    setRequestAppVersionData, setRequestAppVersionLoading, setRequestAppVersionError, setRequestAppVersionMessage, resetRequestAppVersion,
    setRequestAppLocationData, setRequestAppLocationLoading, setRequestAppLocationError, setRequestAppLocationMessage, resetRequestAppLocation
} = requestsAppSlice.actions
export default requestsAppSlice.reducer