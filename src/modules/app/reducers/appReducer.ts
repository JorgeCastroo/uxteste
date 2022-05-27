import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    network?: boolean
    location: number[] | null
}

const initialState: State = {
    network: undefined,
    location: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppNetwork: (state, action: PayloadAction<boolean>) => {
            state.network = action.payload
        },
        setAppLocation: (state, action: PayloadAction<number[]>) => {
            state.location = action.payload
        },
    }
})

export const { setAppNetwork, setAppLocation } = appSlice.actions
export default appSlice.reducer