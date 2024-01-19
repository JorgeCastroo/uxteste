import React, {useCallback, useRef, useState} from 'react';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
import themes from '../../../../styles/themes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';

import FormError from '../../../../components/Form/Error';
import {setModalVisible} from '../../../solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer';
import {useScanCode} from '../../services/useScanCode';
import {Alert} from 'react-native';

const Form: React.FC = () => {
  const messageRef = useRef<FlashMessage>(null);
  const isFocused = useIsFocused();
  const {reading} = useScanCode();
  const {tagsRead} = useAppSelector(s => s.meli);

  const dispatch = useAppDispatch();
  const {modalVisible} = useAppSelector(s => s.solicitacaoScan);
  const [code, setCode] = useState<string | undefined>('');

  const onClose = () => {
    setCode('');
    dispatch(setModalVisible(false));
  };

  const handleCode = useCallback((cod: string | undefined) => {
    if (tagsRead.find(t => t.tagHU === code) === undefined) {
      reading({
        tagHU: cod + '',
        setStateFunction: setCode,
      });
      setCode(code + '');
    } else {
      setCode(code + '');
      Alert.alert(
        'Código já inserido!',
        `Verifique o código ${code + ''} e tente novamente.`,
        [
          {
            text: 'OK',
            onPress: () => setCode(undefined),
          },
        ],
      );
    }
  }, []);

  return (
    <Portal>
      {isFocused && (
        <Dialog
          style={{borderRadius: 16}}
          visible={modalVisible}
          onDismiss={onClose}>
          <Dialog.Title>Digite o código</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="flat"
              label="Código"
              theme={{
                colors: {
                  primary: themes.colors.tertiary,
                  background: '#fff',
                },
              }}
              value={code}
              onChangeText={t => setCode(t.toUpperCase())}
            />
            {/* <FormError
              marginTop={16}
              visible={true}
              message="Código já inserido!"
            /> */}
          </Dialog.Content>
          <Dialog.Actions style={{paddingHorizontal: 20}}>
            <Button uppercase={false} color="blue" onPress={onClose}>
              Fechar
            </Button>
            <Button
              uppercase={false}
              disabled={code === ''}
              color={themes.status.success.primary}
              onPress={() => handleCode(code)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      )}
      <FlashMessage ref={messageRef} position="top" />
    </Portal>
  );
};

export default Form;
