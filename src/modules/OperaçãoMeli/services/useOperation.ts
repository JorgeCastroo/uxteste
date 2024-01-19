import {useState} from 'react';
import {TruxDiscovery} from '../../../interfaces/TruxDiscovery';
import request from '../../../utils/request';
import storage from '../../../utils/storage';
import {Alert} from 'react-native';
import {TypeTagsRead} from './useScanCode';
import {useDispatch} from 'react-redux';
import {
  setMeliIdRomaneio,
  setMeliOperation,
  setMeliRoute,
  setMeliTagsRead,
} from '../reducers/meliReducer';
import {useAppDispatch} from '../../../redux/hooks';
import {setAuthLoading} from '../../auth/reducers/authReducer';

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

export function useOperation() {
  const dispatch = useAppDispatch();
  const GetOperation = async () => {
    const typeOperation = await storage.getItem<number>('IdTipoOperacao');
    const tagsRead = await storage.getItem<TypeTagsRead[]>('tagsRead');
    const destiny = await storage.getItem<number>('idDestiny');
    const origin = await storage.getItem<number>('idOrigin');
    const idRomaneioMeli = await storage.getItem<number>('idRomaneioMeli');

    dispatch(setMeliOperation(typeOperation || 0));
    dispatch(setMeliTagsRead(tagsRead || []));
    dispatch(
      setMeliRoute({idDestiny: destiny || null, idOrigin: origin || null}),
    );
    dispatch(setMeliIdRomaneio(idRomaneioMeli || null));

    try {
    } catch (error) {
      if (error instanceof TypeError) {
        Alert.alert(
          `Ocorreu um erro ao buscar as unidades, tente novamente! `,
          'Entre em contato com a equipe de suporte \n\nError:001 ',
        );
        throw error;
      }
    }
  };

  return {
    GetOperation,
  };
}
