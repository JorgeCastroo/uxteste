import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LayoutRectangle } from "react-native-barcode-mask"
import { ScanModes } from "../../../../config/types"

interface State {
    modalVisible: boolean
    scanMode: ScanModes
    scanFlashlight: boolean
    scanLayout: LayoutRectangle | null
    isScanning: boolean
    scannedSolicitacoes: string[]
}

const initialState: State = {
    modalVisible: false,
    scanMode: 'CODE_39',
    scanFlashlight: false,
    scanLayout: null,
    isScanning: false,
    scannedSolicitacoes: [],
}

const solicitacaoScanSlice = createSlice({
    name: 'solicitacaoScan',
    initialState,
    reducers: {
        setModalVisible: (state, action: PayloadAction<boolean>) => {
            state.modalVisible = action.payload
        },
        setScanMode: (state, action: PayloadAction<ScanModes>) => {
            state.scanMode = action.payload
        },
        setScanFlashlight: (state, action: PayloadAction<boolean>) => {
            state.scanFlashlight = action.payload
        },
        setScanLayout: (state, action: PayloadAction<LayoutRectangle>) => {
            state.scanLayout = action.payload
        },
        setScanning: (state, action: PayloadAction<boolean>) => {
            state.isScanning = action.payload
        },
        addScannedSolicitacao: (state, action: PayloadAction<string>) => {
            if(!state.scannedSolicitacoes.includes(action.payload)){
                state.scannedSolicitacoes.push(action.payload)
            }
        },
        resetScannedSolicitacoes: (state) => {
            state.scannedSolicitacoes = []
        },
    }
})

export const { setModalVisible, setScanning, setScanMode, setScanFlashlight, setScanLayout, addScannedSolicitacao, resetScannedSolicitacoes } = solicitacaoScanSlice.actions
export default solicitacaoScanSlice.reducer