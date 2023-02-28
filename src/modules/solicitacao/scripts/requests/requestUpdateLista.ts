import {VVLOG_AUTHORIZATION, VVLOG_ENDPOINT} from '@env';
import {showMessage} from 'react-native-flash-message';
import {UserData} from '../../../../interfaces/UserData';
import {Endereco} from '../../interfaces/Lista';
import {ResponsePattern} from '../../../../utils/response/types';
import * as R from '../../reducers/lista/requestListaReducer';
import {updateListas} from '../../reducers/lista/listaReducer';
import createListaConfirmada from '../createListaConfirmada';
import confirmUpdateLista from './requestConfirmUpdateLista';
import request from '../../../../utils/request';
import info from '../../../../utils/info';
import MOCK_LISTA_UPDATE from '../../../../mock/listaUpdate';
import {setAppDtAtualizacao} from '../../../app/reducers/appReducer';
import moment from 'moment';
import storage from '../../../../utils/storage';

export default async function updateLista(
  dispatch: Function,
  userData: UserData,
) {
  try {
    //dispatch(updateListas(MOCK_LISTA_UPDATE))
    dispatch(R.setRequestUpdateListaLoading());
    const base_url = await storage.getItem('BASE_URL');

    const endpoint = `${base_url}Lista/FirstMile/AdicionarNovoSeller`;
    const authorization = VVLOG_AUTHORIZATION;
    const body = {
      idTransportadora: userData.idTransportadora,
      idMotorista: userData.idUsuarioSistema,
    };
    const response = await request.post<ResponsePattern<Endereco[]>>({
      endpoint,
      authorization,
      body,
    });

    if (response && 'flagErro' in response) {
      dispatch(R.setRequestUpdateListaData(response));

      if (response.flagErro) {
        throw new Error(response.listaMensagens[0]);
      }

      dispatch(
        setAppDtAtualizacao(moment(new Date()).format('DD/MM/YYYY hh:mm')),
      );

      if (response.listaResultados.length > 0) {
        dispatch(updateListas(response.listaResultados));

        showMessage({
          message: 'Novos endereços foram adicionados!',
          type: 'success',
          duration: 5000,
          floating: true,
        });

        confirmUpdateLista(
          dispatch,
          createListaConfirmada(response.listaResultados),
        );
      }
    } else
      throw new Error(
        'Atenção! O APP está com problemas de conexão com o TMS, por favor informe o departamento de TI.',
      );
  } catch (error: any) {
    info.error('updateLista', error);
    dispatch(
      R.setRequestUpdateListaMessage(error.message ?? JSON.stringify(error)),
    );
    dispatch(R.setRequestUpdateListaError());
    showMessage({
      message: 'Erro ao atualizar a lista!',
      description: error.message ?? JSON.stringify(error),
      type: 'danger',
      duration: 20000,
      floating: true,
    });
  }
}
