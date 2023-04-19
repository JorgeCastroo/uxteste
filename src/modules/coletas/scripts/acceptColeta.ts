import {VVLOG_ENDPOINT, VVLOG_AUTHORIZATION} from '@env';
import {ResponsePattern} from '../../../utils/response/types';
import {
  setRequestColetasAceitasData,
  setRequestAcceptColetasLoading,
} from '../reducers/coletas/requestColetasReducer';
import info from '../../../utils/info';
import request from '../../../utils/request';
import storage from '../../../utils/storage';

interface Body {
  idLista: number;
  idStatusLista: number;
  latitude: string;
  longitude: string;
}

export default async function acceptColeta(dispatch: Function, body: Body) {
  try {
    dispatch(setRequestAcceptColetasLoading());

    const base_url = await storage.getItem('BASE_URL');
    const api_key = await storage.getItem('BASE_API_KEY');  

    const endpoint = `${base_url}Lista/FirstMile/AlterarStatusRomaneio`;
    const authorization: string = api_key as string;
    const response = await request.post<ResponsePattern<any>>({
      authorization,
      endpoint,
      body,
    });

    if (response) {
      dispatch(setRequestColetasAceitasData(response));
      return response;
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('acceptColeta', error);
  }
}
