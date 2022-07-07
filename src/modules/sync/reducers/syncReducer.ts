import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    syncLoading: boolean
}

const initialState: State = {
    syncLoading: false,
}

const syncSlice = createSlice({
    name: 'sync',
    initialState,
    reducers: {
        setSyncLoading: (state, action: PayloadAction<boolean>) => {
            state.syncLoading = action.payload
        },
    }
})

export const { setSyncLoading } = syncSlice.actions
export default syncSlice.reducer