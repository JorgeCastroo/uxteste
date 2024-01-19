import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useNetInfo} from '@react-native-community/netinfo';
import themes from '../styles/themes';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import AppRoutes from '../modules/app/routes';
import {setAppNetwork} from '../modules/app/reducers/appReducer';
import {setAuthLoading} from '../modules/auth/reducers/authReducer';
import AuthRoutes from '../modules/auth/routes';
import getUserData from '../modules/auth/scripts/getUserData';
import localSetLista from '../modules/solicitacao/scripts/local/localSetLista';
import localGetLista from '../modules/solicitacao/scripts/local/localGetLista';
import localGetRoteirizacao from '../modules/roteirizacao/scripts/local/localGetRoteirizacao';
import localGetCoords from '../modules/roteirizacao/scripts/local/localGetCoords';
import syncAll from '../modules/sync/scripts/syncAll';
import AppOperationMeli from '../modules/OperaçãoMeli/routes';
import {useOperation} from '../modules/OperaçãoMeli/services/useOperation';

const Routes: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isLogged, isMeli, authLoading, userData, isCancelOperation} =
    useAppSelector(s => s.auth);

  const {lista, oldLista} = useAppSelector(s => s.lista);
  const netInfo = useNetInfo();

  const {GetOperation} = useOperation();

  useEffect(() => {
    (async () => {
      await GetOperation();
      await getUserData(dispatch);
      await localGetLista(dispatch);
      await localGetRoteirizacao(dispatch);
      await localGetCoords(dispatch);

      dispatch(setAuthLoading(false));
    })();
  }, [dispatch, authLoading]);

  useEffect(() => {
    if (!!lista && JSON.stringify(lista) !== JSON.stringify(oldLista ?? []))
      localSetLista(dispatch, lista, false);
  }, [dispatch, lista]);

  useEffect(() => {
    (async () => {
      if (netInfo.isInternetReachable !== null) {
        if (netInfo.isInternetReachable === true) hideMessage();
        else {
          showMessage({
            message: 'Sem conexão com a internet!',
            type: 'danger',
            duration: 10000,
            autoHide: false,
            floating: true,
          });
        }
      }
    })();
  }, [netInfo.isInternetReachable]);

  useEffect(() => {
    if (netInfo.isInternetReachable !== null) {
      dispatch(setAppNetwork(netInfo.isInternetReachable));

      if (netInfo.isInternetReachable === true && !!userData) {
        syncAll(dispatch, userData);
      }
    }
    dispatch(setAuthLoading(false));
  }, [dispatch, netInfo.isInternetReachable, userData]);

  if (authLoading)
    return (
      <ActivityIndicator
        style={{marginTop: 20}}
        color={themes.colors.primary}
      />
    );
  else
    return isMeli ? (
      <AppOperationMeli />
    ) : isLogged && !isCancelOperation ? (
      <AppRoutes />
    ) : (
      <AuthRoutes />
    );
};

export default Routes;
