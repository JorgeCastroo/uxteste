import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { APP_VERSION } from "../../../config"
import { AppVersion } from "../interfaces/AppVersion"

interface State {
    network?: boolean
    location: number[] | null
    appVersion: AppVersion | null
    isVersionDeprected: boolean
}

const initialState: State = {
    network: undefined,
    location: null,
    appVersion: null,
    isVersionDeprected: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppNetwork: (state, action: PayloadAction<boolean>) => {
            state.network = action.payload
        },
        setAppLocation: (state, action: PayloadAction<number[]>) => {
            state.location = action.payload
        },
        setAppVersion: (state, action: PayloadAction<AppVersion>) => {
            state.appVersion = action.payload
            //state.isVersionDeprected = action.payload.versaoAtual !== APP_VERSION
        },
        setAppVersionDeprected: (state, action: PayloadAction<boolean>) => {
            state.isVersionDeprected = action.payload
        },
    }
})

export const { setAppNetwork, setAppLocation, setAppVersion, setAppVersionDeprected } = appSlice.actions
export default appSlice.reducer