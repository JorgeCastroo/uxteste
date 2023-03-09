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
    const base_url = await storage.getItem('BASE_URL');

    const endpoint = `${base_url}Lista/FirstMile/ListarRomaneio`;
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
      if (!lista) {
        dispatch(setLista(response.listaResultados));
      }

      var listaReferencia: Lista[] = JSON.parse(JSON.stringify(lista));
      response.listaResultados.forEach(i => {
        var listaR = listaReferencia.find(i2 => i2.idLista == i.idLista);
        if (!listaR) {
          console.log('lista nova status 2');
          listaReferencia.push(i);
        } else {
          console.log('lista existente status 2');
          listaR.qtdeTotalVolumes = i.qtdeTotalVolumes;

          i.listaEnderecos.forEach(endereco => {
            var enderecoResult = listaR?.listaEnderecos.find(
              enderecoR => enderecoR.idRemetente === endereco.idRemetente,
            );

            if (enderecoResult) {
              endereco.listaVolumes.forEach(volume => {
                var volumeExist = enderecoResult?.listaVolumes.some(
                  volumeR => volume.idVolume === volumeR.idVolume,
                );

                if (!volumeExist && enderecoResult) {
                  enderecoResult?.listaVolumes.push(volume);
                  enderecoResult.qtdeVolumes = endereco.qtdeVolumes;
                  console.log('Volume Adicionado lista status 2');
                }
              });
            } else {
              listaR?.listaEnderecos.push(endereco);
              console.log('Endereço adicionado lista status 2');
            }
          });
        }
      });

      dispatch(setLista(listaReferencia));

      console.log('Saiu');

      // dispatch(setRequestColetasData(response));
      // if (!response.flagErro) dispatch(setColetas(response.listaResultados));
      // else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('getColetas', error);
    dispatch(setRequestColetasErro());
  }
}