import {VVLOG_ENDPOINT, VVLOG_AUTHORIZATION} from '@env';
import {UserData} from '../../../../../interfaces/UserData';
import * as R from '../../../reducers/authCode/requestAuthCodeReducer';
import info from '../../../../../utils/info';
import request from '../../../../../utils/request';
import setUserData from '../../../scripts/setUserData';
import {codeFormValues} from '../Form/components/constants';
import storage from '../../../../../utils/storage';
import {Alert} from 'react-native';
import {
  TruxDiscovery,
  TruxDiscoveryLogin,
} from '../../../../../interfaces/TruxDiscovery';

async function getToken() {
  const serverApi = 'https://trux-discovery-api.uxsolutions.com.br';

  let newHeaders = new Headers();
  newHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  newHeaders.append('Accept', 'application/json');

  const body =
    'username=admin&password=ux@solutions&scope=portal&client_id=TruxDiscoveryApi&client_secret=4531a3f2b670e434344345718aa8c14976&grant_type=password';

  const response = await fetch(`${serverApi}/connect/token`, {
    method: 'POST',
    headers: newHeaders,
    body: body,
  });

  let jsonResponse;

  if (response.status == 200) {
    jsonResponse = await response.json();
  }

  return jsonResponse as TruxDiscoveryLogin;
}

async function getConfiguracao(codigoAcesso: any, token: TruxDiscoveryLogin) {
  console.log('codigoAcesso', codigoAcesso);
  console.log('token.access_token', token.access_token);

  const serverApi = 'https://trux-discovery-api.uxsolutions.com.br';

  let newHeaders = new Headers();
  newHeaders.append('Authorization', 'bearer ' + token.access_token);

  const response = await fetch(
    `${serverApi}/api/configuracao/parametros?codigoTransportador=${codigoAcesso}`,
    {
      method: 'GET',
      headers: newHeaders,
    },
  );

  let jsonResponse;

  if (response.status == 200) {
    jsonResponse = await response.json();
  }

  console.log('jsonResponse', JSON.stringify(jsonResponse));

  return jsonResponse as TruxDiscovery;
}

export default async function send(
  navigation: any,
  dispatch: Function,
  body: typeof codeFormValues,
) {
  try {
    dispatch(R.setRequestSendAuthCodeLoading());
    const token = await getToken();
    const config = await getConfiguracao(body.code, token);

    if (token && config) {
      await storage.setItem('BASE_URL', config.FirstMileApiMobile);
      await storage.setItem('BASE_API_KEY', config.FirstMileApiKey);
      console
      await storage.setItem('transportadora', config);
      dispatch(R.setRequestSendAuthCodeData(config));
      navigation.navigate('authLogin');
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    //Alert.alert("O código de transportadora informado é inválido ");
    dispatch(R.setRequestSendAuthCodeError());
    dispatch(
      R.setRequestSendAuthCodeMessage(
        'O código de transportadora informado é inválido',
      ),
    );
    console.log(error);
    console.log('ERROR SUBMIT CODIGO ACESSO: ', error);
    return 'erro';
  } finally {
  }
}
