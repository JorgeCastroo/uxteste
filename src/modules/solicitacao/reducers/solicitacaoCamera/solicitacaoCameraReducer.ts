import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RNCamera } from "react-native-camera"

interface State {
    modalVisible: boolean
    scanMode: typeof RNCamera.Constants.BarCodeType["qr"] | typeof RNCamera.Constants.BarCodeType["code39"]
    isScanning: boolean
    scannedSolicitacoes: string[]
}

const initialState: State = {
    modalVisible: false,
    scanMode: RNCamera.Constants.BarCodeType.code39,
    isScanning: false,
    scannedSolicitacoes: [],
}

const solicitacaoCameraSlice = createSlice({
    name: 'solicitacaoCamera',
    initialState,
    reducers: {
        setModalVisible: (state, action: PayloadAction<boolean>) => {
            state.modalVisible = action.payload
        },
        setScanMode: (state, action: PayloadAction<typeof RNCamera.Constants.BarCodeType>) => {
            state.scanMode = action.payload
        },
        setScanning: (state, action: PayloadAction<boolean>) => {
            state.isScanning = action.payload
        },
        addScannedSolicitacao: (state, action: PayloadAction<string>) => {
            if(!state.scannedSolicitacoes.includes(action.payload)){
                state.scannedSolicitacoes.push(action.payload)
            }
        },
    }
})

export const { setModalVisible, setScanning, setScanMode, addScannedSolicitacao } = solicitacaoCameraSlice.actions
export default solicitacaoCameraSlice.reducer