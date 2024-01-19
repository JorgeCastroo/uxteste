import {useState} from 'react';
import {TruxDiscovery} from '../../../interfaces/TruxDiscovery';
import request from '../../../utils/request';
import storage from '../../../utils/storage';
import {Alert} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';

export interface Unity {
  id: number;
  nome: string;
  nroDocumento: string;
  sigla: string;
}

export interface ResponseGetUnity {
  flagErro: boolean;
  mensagem: string;
  unidades: Unity[];
}

export type UnityFinal = {
  label: string;
  value: number;
};

export function useUnits() {
  const [units, setUnits] = useState<UnityFinal[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const {route} = useAppSelector(s => s.meli);
  const [originSelected, setOriginSelected] = useState<
    UnityFinal | undefined
  >();
  const [destinySelected, setDestinySelected] = useState<
    UnityFinal | undefined
  >();

  const GetUnits = async () => {
    setLoading(true);

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );
      const endpoint = `https://stagecargobr.uxsolutions.com.br/Api/UnidadesMeli/Unidades`;
      const authorization = transportadora?.FirstMileApiKey;
      const response = await request.get<ResponseGetUnity>({
        endpoint,
        authorization,
      });

      if (response === null || response === undefined) {
        setLoading(false);
        Alert.alert(
          `Ocorreu um erro ao buscar as unidades, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:002 ',
        );
        throw new Error('Ocorreu um erro ao buscar as unidades');
      } else {
        const data = response.unidades.map(item => {
          return {label: `${item.nome} ( ${item.sigla} )`, value: item.id};
        });
        setUnits(data);
        setLoading(false);
        if (route.idDestiny) {
          const destinyFilter = await data?.find(
            item => item.value === route.idDestiny,
          );
          const originFilter = await data?.find(
            item => item.value === route.idOrigin,
          );
          setOriginSelected(originFilter);
          setDestinySelected(destinyFilter);
        }
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setLoading(false);
        Alert.alert(
          `Ocorreu um erro ao buscar as unidades, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:001 ',
        );
        throw error;
      }
    }
  };

  return {
    loading,
    units,
    GetUnits,
    destinySelected,
    originSelected,
  };
}
