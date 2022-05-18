import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../modules/auth/reducers/authReducer'
import coletasReducer from '../../modules/coletas/reducers/coletas/coletas'
import requestColetasReducer from '../../modules/coletas/reducers/coletas/requestColetasReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        coletas: coletasReducer,
        requestColetas: requestColetasReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store