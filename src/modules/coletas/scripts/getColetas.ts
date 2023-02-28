import {VVLOG_ENDPOINT, VVLOG_AUTHORIZATION} from '@env';
import {UserData} from '../../../interfaces/UserData';
import {setColetas} from '../reducers/coletas/coletas';
import {Lista} from '../../solicitacao/interfaces/Lista';
import {
  setRequestColetasData,
  setRequestColetasErro,
  setRequestColetasLoading,
} from '../reducers/coletas/requestColetasReducer';
import info from '../../../utils/info';
import request from '../../../utils/request';
import {ResponsePattern} from '../../../utils/response/types';
import storage from '../../../utils/storage';
import {showMessage} from 'react-native-flash-message';

export default async function getColetas(
  dispatch: Function,
  userData: UserData,
) {
  try {
    console.log('getColetas');

    dispatch(setRequestColetasLoading());
    dispatch(setColetas(null));

    const base_url = await storage.getItem('BASE_URL');

    const endpoint = `${base_url}Lista/FirstMile/ListarRomaneio`;
    const authorization = VVLOG_AUTHORIZATION;
    const body = {
      idTransportadora: userData.idTransportadora,
      idMotorista: userData.idUsuarioSistema,
      idStatusLista: 1,
    };
    const response = await request.post<ResponsePattern<Lista[]>>({
      endpoint,
      authorization,
      body,
    });

    if (response) {
      dispatch(setRequestColetasData(response));
      if (response.listaMensagens[0] === 'Nenhuma lista para carregar!') {
        showMessage({
          message: `${response.listaMensagens[0]}`,
          type: 'warning',
          duration: 3000,
          floating: true,
        });
      } else {
        showMessage({
          message: `${response.listaMensagens[0]}`,
          type: 'success',
          duration: 3000,
          floating: true,
        });
      }
      if (!response.flagErro) {
        dispatch(setColetas(response.listaResultados));
      } else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('getColetas', error);
    dispatch(setRequestColetasErro());
  }
}
