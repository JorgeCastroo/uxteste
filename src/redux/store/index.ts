import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../modules/auth/reducers/authReducer'
import requestAuthLoginReducer from '../../modules/auth/reducers/authLogin/requestAuthLoginReducer'
import solicitacaoScanReducer from '../../modules/solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer'
import solicitacaoReducer from '../../modules/solicitacao/reducers/solicitacaoReducer'
import listaReducer from '../../modules/solicitacao/reducers/lista/listaReducer'
import requestListaReducer from '../../modules/solicitacao/reducers/lista/requestListaReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        requestSendAuthLogin: requestAuthLoginReducer,

        lista: listaReducer,
        requestLista: requestListaReducer,

        solicitacao: solicitacaoReducer,
        solicitacaoScan: solicitacaoScanReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store