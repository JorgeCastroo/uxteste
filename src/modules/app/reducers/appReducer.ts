import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GeoPosition } from "react-native-geolocation-service"
import { AppVersion } from "../interfaces/AppVersion"
import { APP_VERSION } from "../../../config"

interface State {
    network?: boolean
    location: GeoPosition | null
    appVersion: AppVersion | null
    isVersionDeprected: boolean
    openVersionDialog: boolean
    dtUltimaAtualizacao: string
}

const initialState: State = {
    network: undefined,
    location: null,
    appVersion: null,
    isVersionDeprected: false,
    openVersionDialog: false,
    dtUltimaAtualizacao: ""
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppNetwork: (state, action: PayloadAction<boolean>) => {
            state.network = action.payload
        },
        setAppLocation: (state, action: PayloadAction<GeoPosition | null>) => {
            state.location = action.payload
        },
        setAppDtAtualizacao: (state, action: PayloadAction<string>) => {
            state.dtUltimaAtualizacao = action.payload
        },
        setAppVersion: (state, action: PayloadAction<AppVersion>) => {
            state.appVersion = action.payload
            //state.isVersionDeprected = action.payload.versaoAtual !== APP_VERSION
            //state.openVersionDialog = action.payload.versaoAtual !== APP_VERSION
        },
        setAppVersionDeprected: (state, action: PayloadAction<boolean>) => {
            state.isVersionDeprected = action.payload
        },
        setAppVersionDialog: (state, action: PayloadAction<boolean>) => {
            state.openVersionDialog = action.payload
        },
    }
})

export const { setAppNetwork, setAppLocation, setAppDtAtualizacao, setAppVersion, setAppVersionDeprected, setAppVersionDialog } = appSlice.actions
export default appSlice.reducer