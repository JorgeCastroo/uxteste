import {UserData} from '../../../../../interfaces/UserData';
import * as R from '../../../reducers/authLogin/requestAuthLoginReducer';
import info from '../../../../../utils/info';
import request from '../../../../../utils/request';
import setUserData from '../../../scripts/setUserData';
import {loginFormValues} from '../components/Form/constants';
import storage from '../../../../../utils/storage';
import {TruxDiscovery} from '../../../../../interfaces/TruxDiscovery';

export default async function send(
  navigation: any,
  dispatch: Function,
  body: typeof loginFormValues,
) {
  try {
    dispatch(R.setRequestSendAuthLoginLoading());
    const transportadora = await storage.getItem<TruxDiscovery>(
      'transportadora',
    );

    const endpoint = `${transportadora?.FirstMileApiMobile}Permissao/Login`;
    const authorization = transportadora?.FirstMileApiKey;
    const response = await request.post<UserData>({
      endpoint,
      authorization,
      body,
    });
    if (response) {
      dispatch(R.setRequestSendAuthLoginData(response));
      if ((response as any).flagErro === false && response.idUsuarioSistema) {
        if (transportadora?.FlagMeli === '1') {
          navigation.navigate('authTypeOperation', response);
        } else {
          setUserData(dispatch, response, true);
        }
      } else throw new Error((response as any).listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('send loginIndex', error);
    dispatch(
      R.setRequestSendAuthLoginMessage(error.message ?? JSON.stringify(error)),
    );
    dispatch(R.setRequestSendAuthLoginError());
  }
}
