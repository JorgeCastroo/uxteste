import {VVLOG_AUTHORIZATION} from '@env';
import {UserData} from '../../../interfaces/UserData';
import {setColetas} from '../reducers/coletas/coletas';
import {Lista} from '../../solicitacao/interfaces/Lista';
import {
  setRequestColetasErro,
  setRequestColetasLoading,
} from '../reducers/coletas/requestColetasReducer';
import info from '../../../utils/info';
import request from '../../../utils/request';
import {ResponsePattern} from '../../../utils/response/types';
import {setLista} from '../../solicitacao/reducers/lista/listaReducer';
import storage from '../../../utils/storage';

export default async function getColetando(
  dispatch: Function,
  userData: UserData,
  lista: Lista[],
) {
  try {

    dispatch(setRequestColetasLoading());
    dispatch(setColetas(null));

    const base_url = await storage.getItem('BASE_URL');
    const api_key = await storage.getItem('BASE_API_KEY');  

    const endpoint = `${base_url}Lista/FirstMile/ListarRomaneio`;
    const authorization: string = api_key as string;
    const body = {
      idTransportadora: userData.idTransportadora,
      idMotorista: userData.idUsuarioSistema,
      idStatusLista: 3,
    };

    const response = await request.post<ResponsePattern<Lista[]>>({
      endpoint,
      authorization,
      body,
    });

    if (response) {
      console.log('LISTA REDUX ANTES:');
      console.log(JSON.stringify(lista) );
      if (!lista) {
        console.log('SET LISTA DA API:');
        dispatch(setLista(response.listaResultados));
      }

      var listaReferencia: Lista[] = JSON.parse(JSON.stringify(lista));
      console.log('LISTA API:');
      console.log(JSON.stringify(response.listaResultados) );
      console.log('REDUX LISTA:');
      console.log(JSON.stringify(listaReferencia));
      response.listaResultados.forEach(i => {
        var listaR = listaReferencia.find(i2 => i2.idLista == i.idLista);
        if (!listaR) {
          console.log('1) ADICIONEI A LISTA');
          console.log(i);
          listaReferencia.push(i);
        } else {
          console.log('2) LISTA EXISTE');
          listaR.qtdeTotalVolumes = i.qtdeTotalVolumes;

          i.listaEnderecos.forEach(endereco => {
            var enderecoResult = listaR?.listaEnderecos.find(
              enderecoR => enderecoR.idRemetente === endereco.idRemetente,
            );

            if (enderecoResult) {
              console.log('4) ENDEREÇO EXISTE');
              endereco.listaVolumes.forEach(volume => {
                var volumeExist = enderecoResult?.listaVolumes.some(
                  volumeR => volume.idVolume === volumeR.idVolume,
                );

                if (!volumeExist && enderecoResult) {
                  console.log('5) VOLUME ADD');
                  enderecoResult?.listaVolumes.push(volume);
                  enderecoResult.qtdeVolumes = endereco.qtdeVolumes;
                }
              });
            } else {
              console.log('3) ENDEREÇO ADD');
              listaR?.listaEnderecos.push(endereco);}
          });
        }
      });

      dispatch(setLista(listaReferencia));

      return response.listaResultados;
      // dispatch(setRequestColetasData(response));
      // if (!response.flagErro) dispatch(setColetas(response.listaResultados));
      // else throw new Error(response.listaMensagens[0]);
    } else throw new Error('Erro na requisição');
  } catch (error: any) {
    info.error('getColetas', error);
    dispatch(setRequestColetasErro());
  }
}
