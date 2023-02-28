import {VVLOG_AUTHORIZATION, VVLOG_ENDPOINT} from '@env';
import {ListaConfirmado} from '../../interfaces/ListaConfirmado';
import {ResponsePattern} from '../../../../utils/response/types';
import * as R from '../../reducers/lista/requestListaReducer';
import request from '../../../../utils/request';
import info from '../../../../utils/info';
import storage from '../../../../utils/storage';

export default async function confirmUpdateLista(
  dispatch: Function,
  listaAtualizados: ListaConfirmado[],
) {
  try {
    dispatch(R.setRequestConfirmUpdateListaLoading());
    const base_url = await storage.getItem('BASE_URL');

    const endpoint = `${base_url}Lista/FirstMile/ConfirmarRecebimento`;
    const authorization = VVLOG_AUTHORIZATION;
    const body = {listaAtualizados};
    const response = await request.post<ResponsePattern<any>>({
      endpoint,
      authorization,
      body,
    });

    if (response && 'flagErro' in response) {
      dispatch(R.setRequestConfirmUpdateListaData(response));
      if (response.flagErro) throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('confirmUpdateLista', error);
    dispatch(
      R.setRequestConfirmUpdateListaMessage(
        error.message ?? JSON.stringify(error),
      ),
    );
    dispatch(R.setRequestConfirmUpdateListaError());
  }
}
