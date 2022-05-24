import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Lista } from "../../interfaces/Lista"

interface State {
    lista: Lista[] | null
    oldLista: Lista | null
}

const initialState: State = {
    lista: null,
    oldLista: null,
}

const listaSlice = createSlice({
    name: 'lista',
    initialState,
    reducers: {
        setLista: (state, action: PayloadAction<any>) => {
            state.lista = action.payload
        },
        setOldLista: (state, action: PayloadAction<any>) => {
            state.oldLista = action.payload
        },

        resetLista: (state) => {
            state.lista = null
            state.oldLista = null
        },
    }
})

export const { setLista, setOldLista, resetLista } = listaSlice.actions
export default listaSlice.reducer