import {VVLOG_ENDPOINT, VVLOG_AUTHORIZATION} from '@env';
import {UserData} from '../../../../interfaces/UserData';
import {ResponsePattern} from '../../../../utils/response/types';
import * as R from '../../reducers/lista/requestListaReducer';
import {updateListaSituacao} from '../../reducers/lista/listaReducer';
import request from '../../../../utils/request';
import info from '../../../../utils/info';
import storage from '../../../../utils/storage';
import removeLista from '../removeLista';

export default async function cancelLista(
  dispatch: Function,
  redirect: () => void,
  sync: boolean,
  userData: UserData,
  idLista: number,
  motivoCancelamento: string,
) {
  try {
    dispatch(R.setRequestCancelListaLoading());
    const base_url = await storage.getItem('BASE_URL');
    const api_key = await storage.getItem('BASE_API_KEY');  

    const endpoint = `${base_url}Lista/FirstMile/CancelarRecebimento`;
    const authorization: string = api_key as string;
    
    const body = {
      idTransportadora: userData.idTransportadora,
      idMotorista: userData.idUsuarioSistema,
      idLista,
      motivoCancelamento,
    };
    const response = await request.post<ResponsePattern<any>>({
      endpoint,
      authorization,
      body,
    });
    if (response && 'flagErro' in response) {
      dispatch(R.setRequestCancelListaData(response));
      removeLista(dispatch);

      if (!response.flagErro) {
        removeLista(dispatch);

        if (!sync) {
          dispatch(updateListaSituacao({status: 'CANCELADO', idLista}));
          redirect();
        }
        return true;
      } else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('cancelLista', error);
    dispatch(
      R.setRequestCancelListaMessage(error.message ?? JSON.stringify(error)),
    );
    dispatch(R.setRequestCancelListaError());
    return false;
  }
}
