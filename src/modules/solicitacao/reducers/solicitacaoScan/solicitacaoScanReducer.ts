import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LayoutRectangle } from "react-native-barcode-mask"
import { ScanModes } from "../../../../config/types"

interface State {
    modalVisible: boolean
    scanMode: ScanModes
    scanFlashlight: boolean
    scanLayout: LayoutRectangle | null
    scanVisible: boolean
    isScanning: boolean
    scannedSolicitacoes: string[]
}

const initialState: State = {
    modalVisible: false,
    scanMode: 'QR_CODE',
    scanFlashlight: false,
    scanLayout: null,
    scanVisible: false,
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
        setScanVisible: (state, action: PayloadAction<boolean>) => {
            state.scanVisible = action.payload
        },
        
        setScanning: (state, action: PayloadAction<boolean>) => {
            state.isScanning = action.payload
        },

        addScannedSolicitacao: (state, action: PayloadAction<string>) => {
            if(!state.scannedSolicitacoes.includes(action.payload)){
                state.scannedSolicitacoes.push(action.payload)
            }
        },
        setScannedSolicitacoes: (state, action: PayloadAction<string[]>) => {
            state.scannedSolicitacoes = action.payload
        },

        resetScannedSolicitacoes: (state) => {
            state.scannedSolicitacoes = []
        },
    }
})

export const {
    setModalVisible, 
    setScanning, setScanMode, setScanFlashlight, setScanLayout, setScanVisible, 
    setScannedSolicitacoes, addScannedSolicitacao, 
    resetScannedSolicitacoes
} = solicitacaoScanSlice.actions
export default solicitacaoScanSlice.reducer