import {VVLOG_AUTHORIZATION, VVLOG_ENDPOINT} from '@env';
import {VolumeConfirmado} from '../../interfaces/VolumeConfirmado';
import {ResponsePattern} from '../../../../utils/response/types';
import * as R from '../../reducers/lista/requestListaReducer';
import request from '../../../../utils/request';
import info from '../../../../utils/info';
import storage from '../../../../utils/storage';

export default async function confirmUpdateVolume(
  dispatch: Function,
  listaAtualizados: VolumeConfirmado[],
) {
  try {
    dispatch(R.setRequestConfirmUpdateVolumeLoading());
    const base_url = await storage.getItem('BASE_URL');
    const api_key = await storage.getItem('BASE_API_KEY');  

    const endpoint = `${base_url}Lista/FirstMile/ConfirmarRecebimento`;
    const authorization: string = api_key as string;
    
    const body = {listaAtualizados};
    const response = await request.post<ResponsePattern<any>>({
      endpoint,
      authorization,
      body,
    });

    if (response && 'flagErro' in response) {
      dispatch(R.setRequestConfirmUpdateVolumeData(response));
      if (response.flagErro) throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('confirmUpdateVolume', error);
    dispatch(
      R.setRequestConfirmUpdateVolumeMessage(
        error.message ?? JSON.stringify(error),
      ),
    );
    dispatch(R.setRequestConfirmUpdateVolumeError());
  }
}
