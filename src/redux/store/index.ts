import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../modules/auth/reducers/authReducer'
import solicitacaoCameraReducer from '../../modules/solicitacao/reducers/solicitacaoCamera/solicitacaoCameraReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        solicitacaoCamera: solicitacaoCameraReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store