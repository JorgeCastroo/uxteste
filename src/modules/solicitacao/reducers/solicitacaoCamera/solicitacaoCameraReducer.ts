import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    modalVisible: boolean
    isScanning: boolean
    scannedSolicitacoes: string[]
}

const initialState: State = {
    modalVisible: false,
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

export const { setModalVisible, setScanning, addScannedSolicitacao } = solicitacaoCameraSlice.actions
export default solicitacaoCameraSlice.reducer