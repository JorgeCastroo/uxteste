import React, {useCallback, useState} from 'react';

import * as S from './styles';
import Render from '../../../../components/Screen/Render';
import {Dropdown} from '../../components/Dropdown/Dropdown';
import Button from '../../../../components/Button';

import {useUnits} from '../../services/useUnits';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {TransparentLoading} from '../../components/TransparentLoading';
import Header from '../../components/Header';
import {useCreate} from '../../services/useCreate';
import {AppRoutesParams} from '../../routes/interfaceRoute';

export const ConfigMeli = () => {
  const [origin, seOrigin] = useState<any>(0);
  const [destiny, setDestiny] = useState<any>(1);
  const [typeOperation, setTypeOperation] = useState<any>(0);
  const navigation = useNavigation<NavigationProp<AppRoutesParams>>();

  const {GetUnits, units, loading} = useUnits();
  const {createOperation, loading: loadingCreate} = useCreate();

  const disbledButton =
    origin === destiny ||
    units === undefined ||
    typeOperation === 0 ||
    origin === 0 ||
    destiny === 1;

  useFocusEffect(
    useCallback(() => {
      GetUnits();
    }, []),
  );

  return (
    <Render
      loadingColor={['#fff159']}
      statusBarOptions={{
        barStyle: 'light-content',
        backgroundColor: '#fff159',
      }}
      align="space-between"
      paddingBottom={24}
      onRefresh={async () => {
        GetUnits();
      }}>
      <Header title="Configuração da Operação" configScreen />
      <S.Container>
        <S.SectionDropdown>
          <Dropdown
            data={units}
            search
            label="Origem"
            onSelect={value => seOrigin(value)}
          />
          <Dropdown
            data={units}
            search
            label="Destino"
            onSelect={value => setDestiny(value)}
            error={origin === destiny}
          />

          <Dropdown
            data={[
              {label: 'LineHall', value: 1},
              {label: 'WHP', value: 2},
            ]}
            label="Tipo de Operação"
            onSelect={value => setTypeOperation(value)}
          />
        </S.SectionDropdown>

        <Button
          label="Iniciar Operação"
          meli={true}
          color={['#fff159', '#fff159']}
          loading={loadingCreate}
          disabled={disbledButton}
          onPress={async () => {
            createOperation({
              IdTypeOperation: typeOperation,
              IdUnitsDestiny: destiny,
              IdUnitsOrigin: origin,
            });
          }}
        />
      </S.Container>
      <TransparentLoading visible={loading} />
    </Render>
  );
};
