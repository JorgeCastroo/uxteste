import {useState} from 'react';
import {TruxDiscovery} from '../../../interfaces/TruxDiscovery';
import request from '../../../utils/request';
import storage from '../../../utils/storage';
import {Alert} from 'react-native';
import {AppRoutesParams} from '../routes/interfaceRoute';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux/hooks';
import {setIsCancelOperation} from '../../auth/reducers/authReducer';
import {
  setMeliIdRomaneio,
  setMeliOperation,
  setMeliRoute,
  setMeliTagsRead,
} from '../reducers/meliReducer';
import setUserData from '../../auth/scripts/setUserData';
import {useActions} from './useActions';

interface RomaneioItem {
  id: number;
  idRomaneioMeli: number;
  etiquetaHU: string;
}

interface Romaneio {
  id: number;
  idMotorista: number;
  idUnidadeOrigem: number;
  idUnidadeDestino: number;
  idTipoOperacao: number;
}

interface ResTypeCriacao {
  flagErro: boolean;
  flagExisteRomaneio: boolean;
  romaneio: Romaneio;
  romaneioItem: RomaneioItem[];
  mensagem: string;
}
interface Params {
  flagErro: boolean;
  flagInfo: boolean;
  idCondutor: number;
  idPerfil: number;
  idTransportadora: number;
  idUsuarioSistema: number;
  info: any; // Pode ser ajustado para o tipo apropriado, dependendo da estrutura real
  listaMensagens: string[];
  listaResultados: any[]; // Pode ser ajustado para o tipo apropriado, dependendo da estrutura real
  nomeUsuario: string;
}

type TypeCriacao = {
  idMotorista: number;
  params: Params;
};

export function useOperationStarted() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();

  const {cancelOperation} = useActions();
  const dispatch = useAppDispatch();

  const operationStarted = async ({idMotorista, params}: TypeCriacao) => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );
      const body = {idMotorista: idMotorista};
      console.log(body);
      const endpoint =
        'https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/CarregarOperacaoIniciada';
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.post<ResTypeCriacao>({
        endpoint,
        authorization,
        body,
      });
      console.log(response);
      handleApiResponse(response, params);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiResponse = async (
    response: ResTypeCriacao | null | undefined,
    params: Params,
  ) => {
    setLoading(false);
    if (response === null || response === undefined || response.flagErro) {
      Alert.alert(
        'Ocorreu um erro na API',
        'Entre em contato com a equipe de suporte \n\nError:002 ',
      );
      throw new Error('Ocorreu um erro na API');
    } else if (response.flagExisteRomaneio) {
      Alert.alert(
        'Já existe uma operação iniciada',
        'Deseja prosseguir com a operação? ',
        [
          {
            text: 'Sim',
            onPress: async () => {
              dispatch(setMeliOperation(response.romaneio.idTipoOperacao || 0));
              dispatch(setMeliIdRomaneio(response.romaneio.id || null));
              dispatch(
                setMeliRoute({
                  idDestiny: response.romaneio.idUnidadeDestino || null,
                  idOrigin: response.romaneio.idUnidadeOrigem || null,
                }),
              );

              const tags = response.romaneioItem.map(item => {
                return {
                  idRomaneioItemMeli: item.id + '',
                  tagHU: item.etiquetaHU,
                };
              });

              dispatch(setMeliTagsRead(tags));

              await storage.setItem('idRomaneioMeli', response.romaneio.id);
              await storage.setItem('tagsRead', tags);
              await storage.setItem(
                'IdTipoOperacao',
                response.romaneio.idTipoOperacao,
              );
              await storage.setItem(
                'idDestiny',
                response.romaneio.idUnidadeDestino,
              );
              await storage.setItem(
                'idOrigin',
                response.romaneio.idUnidadeOrigem,
              );
              setUserData(dispatch, params, true, true);
              dispatch(setIsCancelOperation(false));
            },
          },

          {
            text: 'Não',
            onPress: async () => {
              await cancelOperation({
                reason:
                  'Operação cancelada pelo motorista ao logar novamente no app',
                idRomaneioMeli: response.romaneio.id,
                cancelReading: true,
              });
              setUserData(dispatch, params, true, true);
              dispatch(setIsCancelOperation(false));
            },
          },
        ],
      );
    } else {
      setUserData(dispatch, params, true, true);
      dispatch(setIsCancelOperation(false));
    }
  };

  const handleApiError = (error: any) => {
    setLoading(false);

    if (error instanceof TypeError) {
      Alert.alert(
        'Ocorreu um erro na API',
        'Entre em contato com a equipe de suporte \n\nError:001 ',
      );
      throw error;
    }
  };

  return {loading, operationStarted};
}
