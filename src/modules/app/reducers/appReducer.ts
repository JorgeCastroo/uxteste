import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    network?: boolean
}

const initialState: State = {
    network: undefined
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppNetwork: (state, action: PayloadAction<boolean>) => {
            state.network = action.payload
        },
    }
})

export const { setAppNetwork } = appSlice.actions
export default appSlice.reducer