import {configureStore} from '@reduxjs/toolkit';

import appReducer from '../../modules/app/reducers/appReducer';
import requestAppReducer from '../../modules/app/reducers/requestAppReducer';
import authReducer from '../../modules/auth/reducers/authReducer';
import requestAuthLoginReducer from '../../modules/auth/reducers/authLogin/requestAuthLoginReducer';
import requestAuthCodeReducer from '../../modules/auth/reducers/authCode/requestAuthCodeReducer';
import syncReducer from '../../modules/sync/reducers/syncReducer';
import mapReducer from '../../modules/map/reducers/mapReducer';
import listaReducer from '../../modules/solicitacao/reducers/lista/listaReducer';
import requestListaReducer from '../../modules/solicitacao/reducers/lista/requestListaReducer';
import solicitacaoScanReducer from '../../modules/solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer';
import coletasReducer from '../../modules/coletas/reducers/coletas/coletas';
import requestColetasReducer from '../../modules/coletas/reducers/coletas/requestColetasReducer';
import roteirizacaoReducer from '../../modules/roteirizacao/reducers/roteirizacaoReducer';
import requestRoteirizacaoReducer from '../../modules/roteirizacao/reducers/requestRoteirizacaoReducer';
import meliReducer from '../../modules/OperaçãoMeli/reducers/meliReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    requestApp: requestAppReducer,
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

    meli: meliReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
