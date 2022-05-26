import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    renderMap: boolean
    route: any | null
}

const initialState: State = {
    renderMap: false,
    route: null,
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

        resetMap: (state) => {
            state.renderMap = false
            state.route = null
        },
    }
})

export const { setRenderMap, setRoute, resetMap } = mapSlice.actions
export default mapSlice.reducer