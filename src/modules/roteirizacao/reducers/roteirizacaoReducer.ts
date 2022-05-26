import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"
import { Coordinates } from "../../../interfaces/Coordinates"

interface State {
    roteirizacao: RoteirizacaoResponse | null
    markers: Coordinates[] | null
}

const initialState: State = {
    roteirizacao: null,
    markers: null,
}

const roteirizacaoSlice = createSlice({
    name: 'roteirizacao',
    initialState,
    reducers: {
        setRoteirizacao: (state, action: PayloadAction<RoteirizacaoResponse>) => {
            state.roteirizacao = action.payload
        },
        setMarkers: (state, action: PayloadAction<Coordinates[]>) => {
            state.markers = action.payload
        },

        resetRoteirizacao: (state) => {
            state.roteirizacao = null
            state.markers = null
        },
    }
})

export const { setRoteirizacao, setMarkers, resetRoteirizacao } = roteirizacaoSlice.actions
export default roteirizacaoSlice.reducer