import React, {useCallback, useState} from 'react';

import * as S from './styles';
import Render from '../../../../components/Screen/Render';
import Button from '../../../../components/Button';

import {TransparentLoading} from '../../components/TransparentLoading';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {AppRoutesParams} from '../../routes/interfaceRoute';
import Header from '../../components/Header';
import themes from '../../../../styles/themes';
import {Alert} from 'react-native';
import {useActions} from '../../services/useActions';
import CancelModal from '../../../solicitacao/components/CancelModal';
import {setAuthLoading} from '../../../auth/reducers/authReducer';
import {useUnits} from '../../services/useUnits';

import {Operation} from './components/Operation/Operation';
import {TagsGroup} from './components/Tags/Tags';
import {useAppSelector} from '../../../../redux/hooks';

export const OperationMeli = () => {
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();
  const {operation, tagsRead, idRomaneioMeli} = useAppSelector(s => s.meli);
  const {cancelOperation, finishOperation} = useActions();
  const {GetUnits, originSelected, destinySelected, loading} = useUnits();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [reason, setReason] = useState('');

  useFocusEffect(
    useCallback(() => {
      GetUnits();
    }, []),
  );

  return (
    <Render
      Notscrool
      loadingColor={['#fff159']}
      statusBarOptions={{
        barStyle: 'light-content',
        backgroundColor: '#fff159',
      }}
      align="space-between"
      paddingBottom={24}>
      <Header title="Operação" />

      <S.Container>
        <S.Wrapped>
          {!loading && (
            <Operation
              destinySelected={destinySelected}
              originSelected={originSelected}
              typeOperation={operation}
            />
          )}
          <TagsGroup data={tagsRead} />
        </S.Wrapped>

        <S.SectionButton>
          <S.WrappedButton>
            <S.Button>
              <Button
                label="Bipar HU"
                meli={true}
                color={['#fff159', '#fff159']}
                onPress={async () => {
                  navigation.navigate('camScanner');
                }}
              />
            </S.Button>

            <Button
              label="Cancelar Bipagem"
              color={themes.gradient.danger}
              onPress={() => {
                Alert.alert('Atenção', 'Deseja cancelar a operação?', [
                  {text: 'Não', style: 'cancel'},
                  {
                    text: 'Sim',
                    onPress: () => {
                      setOpenCancelModal(true);
                    },
                  },
                ]);
              }}
            />
          </S.WrappedButton>

          <Button
            label="Finalizar Operação"
            color={themes.gradient.success}
            disabled={tagsRead.length > 0 ? false : true}
            onPress={() => {
              Alert.alert('Atenção', 'Deseja finalizar a operação?', [
                {text: 'Não', style: 'cancel'},
                {
                  text: 'Sim',
                  onPress: () => {
                    if (idRomaneioMeli) {
                      finishOperation(idRomaneioMeli);
                    }
                  },
                },
              ]);
            }}
          />
        </S.SectionButton>
        <TransparentLoading visible={loading} />
        <CancelModal
          open={openCancelModal}
          setOpen={setOpenCancelModal}
          motivo={reason}
          setMotivo={setReason}
          onSubmit={async () => {
            setAuthLoading(true);
            cancelOperation({reason: reason, cancelReading: true});
          }}
        />
      </S.Container>
    </Render>
  );
};
