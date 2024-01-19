import {useState} from 'react';
import {TruxDiscovery} from '../../../interfaces/TruxDiscovery';
import request from '../../../utils/request';
import storage from '../../../utils/storage';
import {Alert} from 'react-native';
import {UserData} from '../../../interfaces/UserData';
import {AppRoutesParams} from '../routes/interfaceRoute';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  setMeliIdRomaneio,
  setMeliOperation,
  setMeliRoute,
} from '../reducers/meliReducer';
import {useAppDispatch} from '../../../redux/hooks';

interface ResTypeCreation {
  flagErro: boolean;
  idRomaneioMeli: number;
  mensagem: string;
}
type TypeCriacao = {
  IdUnitsOrigin: number;
  IdUnitsDestiny: number;
  IdTypeOperation: number;
};

export function useCreate() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();
  const dispatch = useAppDispatch();
  const createOperation = async ({
    IdUnitsDestiny,
    IdUnitsOrigin,
    IdTypeOperation,
  }: TypeCriacao) => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );
      const User = await storage.getItem<UserData>('userData');
      const body = {
        IdTipoOperacao: IdTypeOperation,
        IdMotorista: User?.idUsuarioSistema,
        IdUnidadeOrigem: IdUnitsOrigin,
        IdUnidadeDestino: IdUnitsDestiny,
      };
      const endpoint = `https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/Criacao`;
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.post<ResTypeCreation>({
        endpoint,
        authorization,
        body,
      });
      if (response === null || response === undefined) {
        setLoading(false);
        Alert.alert(
          `Ocorreu um erro ao iniciar operação, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:002 ',
        );
        throw new Error('Ocorreu um erro ao iniciar operação');
      } else {
        await storage.setItem('IdTipoOperacao', IdTypeOperation);
        await storage.setItem('idRomaneioMeli', response.idRomaneioMeli);
        await storage.setItem('idDestiny', IdUnitsDestiny);
        await storage.setItem('idOrigin', IdUnitsOrigin);
        dispatch(setMeliOperation(IdTypeOperation || 0));

        dispatch(
          setMeliRoute({
            idDestiny: IdUnitsDestiny || null,
            idOrigin: IdUnitsOrigin || null,
          }),
        );
        dispatch(setMeliIdRomaneio(response.idRomaneioMeli || null));

        setLoading(false);

        Alert.alert(`Operação criada com sucesso`, 'Você será redirecionado', [
          {
            text: 'OK',
            onPress: () => {
              onSuccess();
            },
          },
        ]);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setLoading(false);
        Alert.alert(
          `Ocorreu um erro ao iniciar operação, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:001 ',
        );
        throw error;
      }
    }
  };

  const onSuccess = () => {
    navigation.navigate('operationMeli');
  };

  return {loading, createOperation, onSuccess};
}
