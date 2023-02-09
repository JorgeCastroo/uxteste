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
import {setLista} from '../../solicitacao/reducers/lista/listaReducer';
import {setRequestSaveListaData} from '../../solicitacao/reducers/lista/requestListaReducer';
import storage from '../../../utils/storage';

export default async function getAprovados(
  dispatch: Function,
  userData: UserData,
  lista: Lista[],
) {
  try {
    console.log('getAprovados');

    dispatch(setRequestColetasLoading());
    dispatch(setColetas(null));

    const endpoint = `${VVLOG_ENDPOINT}/Lista/FirstMile/ListarRomaneio`;
    const authorization = VVLOG_AUTHORIZATION;
    const body = {
      idTransportadora: userData.idTransportadora,
      idMotorista: userData.idUsuarioSistema,
      idStatusLista: 2,
    };
    const response = await request.post<ResponsePattern<Lista[]>>({
      endpoint,
      authorization,
      body,
    });

    if (response) {
      var listadd = response.listaResultados.filter(
        item => !lista.some(item2 => item2.idLista === item.idLista),
      );

      if (!lista) {
        dispatch(setLista(response.listaResultados));
      }

      if (listadd.length > 0) {
        const newlista = lista.concat(listadd);
        dispatch(setLista(newlista));

        console.log('Adicionada Lista status 2');
      } else {
        console.log('Lista atualizada !');
      }

      // dispatch(setRequestColetasData(response));
      // if (!response.flagErro) dispatch(setColetas(response.listaResultados));
      // else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('getColetas', error);
    dispatch(setRequestColetasErro());
  }
}
