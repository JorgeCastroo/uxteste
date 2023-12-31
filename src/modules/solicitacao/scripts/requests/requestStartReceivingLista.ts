import {VVLOG_ENDPOINT, VVLOG_AUTHORIZATION} from '@env';
import {Coordinates} from '../../../../interfaces/Coordinates';
import {ResponsePattern} from '../../../../utils/response/types';
import * as R from '../../reducers/lista/requestListaReducer';
import {updateListaSituacao} from '../../reducers/lista/listaReducer';
import info from '../../../../utils/info';
import request from '../../../../utils/request';
import {idStatusLista} from '../../../../constants/idStatusLista';
import storage from '../../../../utils/storage';

export default async function startReceivingLista(
  dispatch: Function,
  sync: boolean,
  idLista: number,
  idRemetente: number,
  coords: Coordinates,
) {
  try {
    dispatch(R.setRequestStartReceivingListaLoading());
    const base_url = await storage.getItem('BASE_URL');
    const api_key = await storage.getItem('BASE_API_KEY');  

    const endpoint = `${base_url}Lista/FirstMile/AlterarStatusRomaneio`;
    const authorization: string = api_key as string;
    
    const body = {
      idLista,
      idRemetente,
      idStatusLista: idStatusLista['COLETANDO'],
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    const response = await request.post<ResponsePattern<any>>({
      endpoint,
      authorization,
      body,
    });

    if (response && 'flagErro' in response) {
      dispatch(R.setRequestStartReceivingListaData(response));
      if (!response.flagErro) {
        if (!sync)
          dispatch(updateListaSituacao({status: 'COLETANDO', idLista}));
        return true;
      } else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('startReceivingLista', error);
    dispatch(
      R.setRequestStartReceivingListaMessage(
        error.message ?? JSON.stringify(error),
      ),
    );
    dispatch(R.setRequestStartReceivingListaError());
    return false;
  }
}
