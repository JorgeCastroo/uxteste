import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    renderMap: boolean
    route: any | null
    openModal: boolean
}

const initialState: State = {
    renderMap: false,
    route: null,
    openModal: false,
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setRenderMap: (state, action: PayloadAction<boolean>) => {
            state.renderMap = action.payload
        },
        setRoute: (state, action: PayloadAction<any>) => {
            state.route = action.payload
        },
        setOpenModal: (state, action: PayloadAction<boolean>) => {
            state.openModal = action.payload
        },

        resetMap: (state) => {
            state.renderMap = false
            state.route = null
        },
    }
})

export const { setRenderMap, setRoute, setOpenModal, resetMap } = mapSlice.actions
export default mapSlice.reducer