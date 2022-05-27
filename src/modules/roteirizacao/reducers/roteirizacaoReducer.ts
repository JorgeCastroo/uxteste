import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Coordinates } from "../../../interfaces/Coordinates"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"

interface State {
    roteirizacao: RoteirizacaoResponse | null
    startCoords: Coordinates | null
    endCoords: Coordinates | null
}

const initialState: State = {
    roteirizacao: null,
    startCoords: null,
    endCoords: null,
}

const roteirizacaoSlice = createSlice({
    name: 'roteirizacao',
    initialState,
    reducers: {
        setRoteirizacao: (state, action: PayloadAction<RoteirizacaoResponse>) => {
            state.roteirizacao = action.payload
        },
        setStartCoords: (state, action: PayloadAction<Coordinates>) => {
            state.startCoords = action.payload
        },
        setEndCoords: (state, action: PayloadAction<Coordinates>) => {
            state.endCoords = action.payload
        },

        resetRoteirizacao: (state) => {
            state.roteirizacao = null
            state.startCoords = null
            state.endCoords = null
        },
    }
})

export const { setRoteirizacao, setStartCoords, setEndCoords, resetRoteirizacao } = roteirizacaoSlice.actions
export default roteirizacaoSlice.reducer