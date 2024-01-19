import {useState} from 'react';
import {TruxDiscovery} from '../../../interfaces/TruxDiscovery';
import request from '../../../utils/request';
import storage from '../../../utils/storage';
import {Alert} from 'react-native';
import {AppRoutesParams} from '../routes/interfaceRoute';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import setUserLogout from '../../auth/scripts/setUserLogout';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  setAuthLogin,
  setIsCancelOperation,
} from '../../auth/reducers/authReducer';
import {TypeTagsRead} from './useScanCode';
import {
  setMeliIdRomaneio,
  setMeliOperation,
  setMeliRoute,
  setMeliTagsRead,
} from '../reducers/meliReducer';
import c from '../../sync/scripts/createValueToSync';

interface ResTypeCriacao {
  flagErro: boolean;
  idRomaneioMeli: number;
  mensagem: string;
}
type TypeCriacao = {
  reason: string;
  cancelReading?: boolean;
  cancelOperationOption?: boolean;
  idRomaneioMeli?: number;
};

type TypeOnSucces = {
  cancelReading?: boolean;
  cancelOperationOption?: boolean;
};

type TypeRemoveItem = {
  Id: string;
};

export function useActions() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();
  const dispatch = useAppDispatch();
  const {tagsRead} = useAppSelector(s => s.meli);

  const finishOperation = async (id: number) => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );
      const body = {id: id};
      const endpoint =
        'https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/FinalizarBipagem';
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.post<ResTypeCriacao>({
        endpoint,
        authorization,
        body,
      });

      if (response === null || response === undefined) {
        Alert.alert(
          'Ocorreu um erro na API',
          'Entre em contato com a equipe de suporte \n\nError:002 ',
        );
        throw new Error('Ocorreu um erro na API');
      } else {
        Alert.alert(response.mensagem);

        await storage.removeItem('IdTipoOperacao');
        await storage.removeItem('idRomaneioMeli');
        await storage.removeItem('tagsRead');
        dispatch(setMeliTagsRead([]));
        dispatch(setMeliOperation(null));
        dispatch(setMeliIdRomaneio(null));
        navigation.navigate('configMeli');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const removeItens = async (body: TypeRemoveItem[]) => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );

      const endpoint =
        'https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/RemoverItemLote';
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.post<ResTypeCriacao>({
        endpoint,
        authorization,
        body,
      });

      if (response === null || response === undefined) {
        Alert.alert(
          'Ocorreu um erro na API',
          'Entre em contato com a equipe de suporte \n\nError:002 ',
        );
        throw new Error('Ocorreu um erro na API');
      } else {
        Alert.alert(response.mensagem);
        if (tagsRead && tagsRead.length > 0) {
          const filteredTags = tagsRead.filter(tag => {
            return !body.some(
              itemBody => itemBody.Id === tag.idRomaneioItemMeli,
            );
          });

          await storage.setItem('tagsRead', filteredTags);
          dispatch(setMeliTagsRead(filteredTags));
        }
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const removeItem = async (body: TypeRemoveItem) => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );

      const endpoint =
        'https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/RemoverItem';
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.post<ResTypeCriacao>({
        endpoint,
        authorization,
        body,
      });

      if (response === null || response === undefined) {
        Alert.alert(
          'Ocorreu um erro na API',
          'Entre em contato com a equipe de suporte \n\nError:002 ',
        );
        throw new Error('Ocorreu um erro na API');
      } else {
        Alert.alert('Item removido com sucesso');
        if (tagsRead && tagsRead.length > 0) {
          const response = await tagsRead.filter(
            item => item.idRomaneioItemMeli !== body.Id,
          );
          await storage.setItem('tagsRead', response);
          dispatch(setMeliTagsRead(response));
        }
      }
    } catch (error) {
      handleApiError(error);
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

  const cancelOperation = async ({
    reason,
    cancelReading,
    cancelOperationOption,
    idRomaneioMeli,
  }: TypeCriacao) => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );
      const id = await storage.getItem('idRomaneioMeli');

      const body = {
        Id: idRomaneioMeli ? idRomaneioMeli : id,
        MotivoCancelamento: reason,
      };
      const endpoint = `https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/Cancelar`;
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.post<ResTypeCriacao>({
        endpoint,
        authorization,
        body,
      });

      if (response === null || response === undefined) {
        setLoading(false);
        Alert.alert(
          `Ocorreu um erro ao cancelar operação, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:002 ',
        );
        throw new Error('Ocorreu um erro ao cancelar operação');
      } else {
        setLoading(false);

        Alert.alert(
          `Operação cancelada com sucesso`,
          'Você será redirecionado',
          [
            {
              text: 'OK',
              onPress: () => {
                onSuccess({cancelReading, cancelOperationOption});
              },
            },
          ],
        );
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setLoading(false);
        Alert.alert(
          `Ocorreu um erro ao cancelar operação, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:001 ',
        );
        throw error;
      }
    }
  };

  const onSuccess = async ({
    cancelReading,
    cancelOperationOption,
  }: TypeOnSucces) => {
    if (cancelReading) {
      await storage.removeItem('IdTipoOperacao');
      await storage.removeItem('idRomaneioMeli');
      await storage.removeItem('tagsRead');
      dispatch(setMeliTagsRead([]));
      dispatch(setMeliOperation(null));
      dispatch(setMeliIdRomaneio(null));
      navigation.navigate('configMeli');
    } else if (cancelOperationOption) {
      dispatch(setIsCancelOperation(true));
      await storage.removeItem('IdTipoOperacao');
      await storage.removeItem('idRomaneioMeli');
      await storage.removeItem('operationMeli');
      await storage.removeItem('tagsRead');

      dispatch(setMeliOperation(null));
      dispatch(setMeliIdRomaneio(null));
      dispatch(setMeliTagsRead([]));
      dispatch(setMeliRoute({idDestiny: null, idOrigin: null}));
      dispatch(setAuthLogin(false));
    } else {
      setUserLogout(dispatch, () => navigation.navigate('configMeli'));
    }
  };

  return {
    loading,
    cancelOperation,
    finishOperation,
    onSuccess,
    removeItem,
    removeItens,
  };
}
