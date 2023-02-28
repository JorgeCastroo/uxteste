import {VVLOG_AUTHORIZATION, VVLOG_ENDPOINT} from '@env';
import {ResponsePattern} from '../../../../utils/response/types';
import * as R from '../../reducers/lista/requestListaReducer';
import removeLista from '../removeLista';
import request from '../../../../utils/request';
import info from '../../../../utils/info';
import storage from '../../../../utils/storage';

export default async function closeLista(
  dispatch: Function,
  idsLista: number[],
) {
  try {
    dispatch(R.setRequestCloseListaLoading());
    const base_url = await storage.getItem('BASE_URL');

    const endpoint = `${base_url}Lista/FirstMile/ConcluirRecebimento`;
    const authorization = VVLOG_AUTHORIZATION;
    const body = {idsLista};
    const response = await request.post<ResponsePattern<any>>({
      endpoint,
      authorization,
      body,
    });

    if (response && 'flagErro' in response) {
      dispatch(R.setRequestCloseListaData(response));
      if (!response.flagErro) await removeLista(dispatch);
      else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('closeLista', error);
    dispatch(
      R.setRequestCloseListaMessage(error.message ?? JSON.stringify(error)),
    );
    dispatch(R.setRequestCloseListaError());
  }
}
