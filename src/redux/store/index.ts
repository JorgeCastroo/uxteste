import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../modules/auth/reducers/authReducer'
import requestAuthLoginReducer from '../../modules/auth/reducers/authLogin/requestAuthLoginReducer'
import solicitacaoScanReducer from '../../modules/solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer'
import listaReducer from '../../modules/solicitacao/reducers/lista/listaReducer'
import requestListaReducer from '../../modules/solicitacao/reducers/lista/requestListaReducer'
import coletasReducer from '../../modules/coletas/reducers/coletas/coletas'
import requestColetasReducer from '../../modules/coletas/reducers/coletas/requestColetasReducer'
import requestRoteirizacaoReducer from '../../modules/roteirizacao/reducers/requestRoteirizacaoReducer'
import roteirizacaoReducer from '../../modules/roteirizacao/reducers/roteirizacaoReducer'
import appReducer from '../../modules/app/reducers/appReducer'
import mapReducer from '../../modules/map/reducers/mapReducer'
import syncReducer from '../../modules/sync/reducers/syncReducer'
import requestAuthCodeReducer from '../../modules/auth/reducers/authCode/requestAuthCodeReducer'

const store = configureStore({
    reducer: {
        app: appReducer,
        sync: syncReducer,
        
        auth: authReducer,
        requestAuthLogin: requestAuthLoginReducer,
        requestAuthCode: requestAuthCodeReducer,

        map: mapReducer,

        lista: listaReducer,
        requestLista: requestListaReducer,

        solicitacaoScan: solicitacaoScanReducer,
        
        coletas: coletasReducer,
        requestColetas: requestColetasReducer,

        roteirizacao: roteirizacaoReducer,
        requestRoteirizacao: requestRoteirizacaoReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store