import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../modules/auth/reducers/authReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store