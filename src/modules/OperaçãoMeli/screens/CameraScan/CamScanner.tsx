import React, {useCallback, useEffect, useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';

import Render from '../../../../components/Screen/Render';
import Form from '../../components/Form';
import Control from '../../components/Control';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {AppRoutesParams} from '../../routes/interfaceRoute';
import storage from '../../../../utils/storage';
import {Mask} from './components/Mask/Mask';
import {useScanCode} from '../../services/useScanCode';
import {useAppSelector} from '../../../../redux/hooks';
import {Alert} from 'react-native';

export const CamScanner = () => {
  const cameraRef = useRef<RNCamera>(null);
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();
  const {reading} = useScanCode();
  const {tagsRead} = useAppSelector(s => s.meli);

  const [id, setId] = useState<number | null>();
  const [codeRead, setCodeRead] = useState<string | undefined>(undefined);

  const getIdOperacao = async () => {
    const id = await storage.getItem<number>('IdTipoOperacao');
    setId(id);
  };

  useFocusEffect(
    useCallback(() => {
      getIdOperacao();
    }, []),
  );

  return (
    <>
      <Render
        statusBarOptions={{barStyle: 'light-content', translucent: true}}
        paddingBottom={0}>
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={{width: '100%', height: '100%'}}
          flashMode={RNCamera.Constants.FlashMode['off']}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message: 'Precisamos da sua permissão para usar a câmera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancelar',
          }}
          onGoogleVisionBarcodesDetected={({barcodes = []}) => {
            if (barcodes.length > 0) {
              if (codeRead === undefined) {
                if (
                  tagsRead.find(t => t.tagHU === barcodes[0].data) === undefined
                ) {
                  reading({
                    tagHU: barcodes[0].data,
                    setStateFunction: setCodeRead,
                  });
                  setCodeRead(barcodes[0].data);
                } else {
                  setCodeRead(barcodes[0].data);
                  Alert.alert(
                    'Código já inserido!',
                    `Verifique o código ${barcodes[0].data} e tente novamente.`,
                    [
                      {
                        text: 'OK',
                        onPress: () => setCodeRead(undefined),
                      },
                    ],
                  );
                }
              }
            }
          }}>
          <Mask type={id === 1 ? 'qrcode' : 'barcode'} />
        </RNCamera>

        <Control navigation={navigation} />
      </Render>
      <Form />
    </>
  );
};
