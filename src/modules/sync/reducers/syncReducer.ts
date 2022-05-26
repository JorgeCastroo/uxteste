import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    syncLoading: boolean
    syncAddLoading: boolean
}

const initialState: State = {
    syncLoading: false,
    syncAddLoading: false,
}

const syncSlice = createSlice({
    name: 'sync',
    initialState,
    reducers: {
        setSyncLoading: (state, action: PayloadAction<boolean>) => {
            state.syncLoading = action.payload
        },
        setSyncAddLoading: (state, action: PayloadAction<boolean>) => {
            state.syncAddLoading = action.payload
        },
    }
})

export const { setSyncLoading, setSyncAddLoading } = syncSlice.actions
export default syncSlice.reducer