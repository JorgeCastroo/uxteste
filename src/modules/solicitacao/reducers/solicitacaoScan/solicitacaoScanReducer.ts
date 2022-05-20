import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ScanModes } from "../../../../config/types"

interface State {
    modalVisible: boolean
    scanMode: ScanModes
    isScanning: boolean
    scannedSolicitacoes: string[]
}

const initialState: State = {
    modalVisible: false,
    scanMode: 'CODE_39',
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

export const { setModalVisible, setScanning, setScanMode, addScannedSolicitacao } = solicitacaoScanSlice.actions
export default solicitacaoScanSlice.reducer