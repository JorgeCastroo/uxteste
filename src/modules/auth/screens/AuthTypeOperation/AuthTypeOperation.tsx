import React from 'react';
import Render from '../../../../components/Screen/Render';
import Section from '../../../../components/Screen/Section';
import AutoHeightImage from 'react-native-auto-height-image';
import AppVersion from '../../../app/components/AppVersion';
import Button from '../../../../components/Button';

import * as S from './styles';
import setUserData from '../../scripts/setUserData';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {setIsCancelOperation} from '../../reducers/authReducer';
import {useOperationStarted} from '../../../OperaçãoMeli/services/useOperationStarted';

const AuthTypeOperation: React.FC = (route: any) => {
  const dispatch = useAppDispatch();
  const {operationStarted} = useOperationStarted();

  const {userData} = useAppSelector(s => s.auth);

  const idUser = route.route.params
    ? route.route.params.idUsuarioSistema
    : userData?.idUsuarioSistema;

  return (
    <>
      <Render
        statusBarOptions={{barStyle: 'dark-content', backgroundColor: '#fff'}}
        wrapperColor="#fff"
        paddingBottom={20}
        align="space-between">
        <Section marginTop={20} center>
          <AutoHeightImage
            source={require('../../../../assets/images/logo4.png')}
            width={200}
          />
        </Section>
        <S.Container>
          <S.Title>Selecione o tipo de operação</S.Title>
          <S.SectionButton>
            <Button
              label="Operação Normal"
              onPress={() => {
                setUserData(dispatch, route.route.params, true);
                dispatch(setIsCancelOperation(false));
              }}
            />
            <Button
              label="Operação MELI"
              meli={true}
              color={['#fff159', '#fff159']}
              onPress={async () => {
                operationStarted({
                  idMotorista: idUser,
                  params: route.route.params,
                });
              }}
            />
          </S.SectionButton>

          <S.SectionButton>
            <S.Description>Operação de Coleta de Carga</S.Description>
            <S.Description>
              Operação de Transferência de Carga Mercado Livre
            </S.Description>
          </S.SectionButton>
        </S.Container>

        <AppVersion />
      </Render>
    </>
  );
};

export default AuthTypeOperation;
