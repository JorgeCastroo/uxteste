import {Dispatch, SetStateAction, useState} from 'react';
import {TruxDiscovery} from '../../../interfaces/TruxDiscovery';
import request from '../../../utils/request';
import storage from '../../../utils/storage';
import {Alert} from 'react-native';
import {UserData} from '../../../interfaces/UserData';
import {AppRoutesParams} from '../routes/interfaceRoute';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {setMeliTagsRead} from '../reducers/meliReducer';

interface ResTypeReading {
  flagErro: boolean;
  mensagem: string;
  idRomaneioItemMeli: string;
}

type TypeReading = {
  tagHU: string;
  setStateFunction: Dispatch<SetStateAction<string | undefined>>;
};

export type TypeTagsRead = {
  tagHU: string;
  idRomaneioItemMeli: string;
};

export function useScanCode() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();

  const dispatch = useAppDispatch();
  const {tagsRead} = useAppSelector(s => s.meli);

  const reading = async ({tagHU, setStateFunction}: TypeReading) => {
    setLoading(true);
    const id = await storage.getItem<number>('idRomaneioMeli');

    try {
      const transportadora = await storage.getItem<TruxDiscovery>(
        'transportadora',
      );
      const authorization = transportadora?.FirstMileApiKey;

      const body = {
        IdRomaneioMeli: id,
        EtiquetaHU: tagHU,
      };

      const endpoint =
        'https://stagecargobr.uxsolutions.com.br/Api/RomaneioMeli/Bipagem';

      const response = await request.post<ResTypeReading>({
        endpoint,
        authorization,
        body,
      });

      if (!response || response.flagErro) {
        setLoading(false);
        if (response?.flagErro) {
          Alert.alert(
            response.mensagem,
            'Verifique se a etiqueta está correta e tente novamente.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setStateFunction(undefined);
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Ocorreu um erro ao realizar a bipagem, tente novamente!',
            'Entre em contato com a equipe de suporte.\n\nError:002',
            [
              {
                text: 'OK',
                onPress: () => {
                  setStateFunction(undefined);
                },
              },
            ],
          );

          throw new Error('Ocorreu um erro ao realizar a bipagem');
        }
      } else {
        setLoading(false);

        if (tagsRead) {
          const responseGet = await tagsRead.filter(
            item => item.idRomaneioItemMeli !== response.idRomaneioItemMeli,
          );

          await storage.setItem('tagsRead', [
            ...responseGet,
            {idRomaneioItemMeli: response.idRomaneioItemMeli, tagHU: tagHU},
          ]);

          dispatch(
            setMeliTagsRead([
              ...responseGet,
              {idRomaneioItemMeli: response.idRomaneioItemMeli, tagHU: tagHU},
            ]),
          );
        } else {
          await storage.setItem('tagsRead', [
            {idRomaneioItemMeli: response.idRomaneioItemMeli, tagHU: tagHU},
          ]);
          dispatch(
            setMeliTagsRead([
              {idRomaneioItemMeli: response.idRomaneioItemMeli, tagHU: tagHU},
            ]),
          );
        }

        Alert.alert(
          'Bipagem realizada com sucesso',
          'A etiqueta foi bipada com sucesso.',
          [
            {
              text: 'OK',
              onPress: () => {
                setStateFunction(undefined);
                navigation.goBack();
              },
            },
          ],
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Ocorreu um erro ao realizar a bipagem, tente novamente!',
        'Entre em contato com a equipe de suporte.\n\nError:001',
        [
          {
            text: 'OK',
            onPress: () => {
              setStateFunction(undefined);
            },
          },
        ],
      );
      throw error;
    }
  };

  return {loading, reading};
}
