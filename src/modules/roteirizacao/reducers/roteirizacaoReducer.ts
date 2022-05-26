import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RoteirizacaoResponse } from "../../../interfaces/Roteirizacao"

interface State {
    roteirizacao: RoteirizacaoResponse | null
}

const initialState: State = {
    roteirizacao: null,
}

const roteirizacaoSlice = createSlice({
    name: 'roteirizacao',
    initialState,
    reducers: {
        setRoteirizacao: (state, action: PayloadAction<RoteirizacaoResponse>) => {
            state.roteirizacao = action.payload
        },

        resetRoteirizacao: (state) => {
            state.roteirizacao = null
        },
    }
})

export const { setRoteirizacao, resetRoteirizacao } = roteirizacaoSlice.actions
export default roteirizacaoSlice.reducer