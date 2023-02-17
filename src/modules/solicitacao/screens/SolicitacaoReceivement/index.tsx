import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SolicitacaoRoutesParams} from '../../interfaces/SolicitacaoRoutesParams';
import themes from '../../../../styles/themes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  updateEnderecoSituacao,
  updateListaSituacao,
} from '../../reducers/lista/listaReducer';
import Render from '../../../../components/Screen/Render';
import Header from '../../../../components/Screen/Header';
import Button from '../../../../components/Button';
import Section from '../../../../components/Screen/Section';
import SolicitacaoBox from '../../components/SolicitacaoBox';
import start from './scripts/start';
import send from './scripts/send';
import {idStatusLista} from '../../../../constants/idStatusLista';
import StatusBox from './components/StatusBox';
import SuccessModal from './components/SuccessModal';
import {getCoords} from '../../../app/scripts/geolocationService';
import findListaPosition from '../../scripts/findListaPosition';
import findEndereco from '../../scripts/findEndereco';
import checkStatus from '../../scripts/checkStatus';
import cancelEndereco from './scripts/cancelEndereco';
import getVolumes from '../../scripts/getVolumes';
import findLista from '../../scripts/findLista';
import sleep from '../../../../utils/sleep';
import {useNetInfo} from '@react-native-community/netinfo';
import storage from '../../../../utils/storage';

const SolicitacaoReceivement: React.FC<
  StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoReceivement'>
> = ({navigation}) => {
  const netInfo = useNetInfo();

  const dispatch = useAppDispatch();
  const {network, location} = useAppSelector(s => s.app);
  const {userData} = useAppSelector(s => s.auth);
  const {lista, currentSolicitacao} = useAppSelector(s => s.lista);
  const {dtUltimaAtualizacao} = useAppSelector(s => s.app);
  //const { roteirizacao } = useAppSelector(s => s.roteirizacao)
  const {
    requestStartReceivingLista,
    requestSaveLista,
    requestSendLeituraLista,
    requestCancelEnderecoLista,
    requestStartReceivingEndereco,
  } = useAppSelector(s => s.requestLista);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const SHOW_DATA = !!currentSolicitacao && !!lista;

  const redirectList = () => navigation.navigate('rotas');
  const redirectScan = () => navigation.navigate('solicitacaoScan');

  const checkSaveLista = () => {
    const {idLista, idRemetente} = currentSolicitacao!;
    return checkStatus(findLista(lista!, idLista), idRemetente, [
      'APROVADO',
      'COLETANDO',
    ]);
  };

  const handleStart = async () => {
    const {idLista, idRemetente} = currentSolicitacao!;

    await start(
      dispatch,
      !!network,
      idLista,
      idRemetente,
      getCoords(location!),
    );
    //await startEndereco(dispatch, !!network, handleNavigate, idLista, idRemetente, getCoords(location!))

    dispatch(
      updateEnderecoSituacao({status: 'COLETANDO', idLista, idRemetente}),
    );
    redirectScan();
  };

  const handleCancelEndereco = async () => {
    const {idLista, idRemetente} = currentSolicitacao!;
    await cancelEndereco(
      dispatch,
      !!network,
      redirectList,
      userData!,
      idLista,
      idRemetente,
    );

    if (!checkSaveLista()) {
      await sleep(500);
      dispatch(updateListaSituacao({status: 'FINALIZADO', idLista}));
    }
  };

  const handleSend = async () => {
    const {idLista, idRemetente} = currentSolicitacao!;
    const openModal = () => setOpenSuccessModal(true);

    if (netInfo.isInternetReachable) {
      await send(
        dispatch,
        !!network,
        redirectList,
        openModal,
        userData!,
        idLista,
        idRemetente,
        getVolumes(lista!, currentSolicitacao!),
      );

      if (!checkSaveLista()) {
        await sleep(500);
        dispatch(updateListaSituacao({status: 'FINALIZADO', idLista}));
      }
    } else {
      const result: any = await storage.getItem('@_ListaPeding');

      if (!result) {
        await storage.setItem('@_ListaPeding', [currentSolicitacao]);
        await dispatch(
          updateEnderecoSituacao({status: 'PENDENTE', idLista, idRemetente}),
        );
        await navigation.navigate('rotas');
      } else {
        const verify = result.filter(
          (x: any) => x.idRemetente === currentSolicitacao?.idRemetente,
        );
        if (verify.length) {
          await storage.setItem('@_ListaPeding', result);
          await dispatch(
            updateEnderecoSituacao({status: 'PENDENTE', idLista, idRemetente}),
          );
          await navigation.navigate('rotas');
        } else {
          const dataPrevius = [...result, currentSolicitacao];

          await storage.setItem('@_ListaPeding', dataPrevius);
          await dispatch(
            updateEnderecoSituacao({status: 'PENDENTE', idLista, idRemetente}),
          );

          await navigation.navigate('rotas');
        }
      }
    }
  };

  return (
    <>
      <Render
        statusBarOptions={{
          barStyle: 'light-content',
          backgroundColor: themes.colors.primary,
        }}
        paddingBottom={24}>
        <Header title="Lista" screenName="solicitacaoReceivement" />
        {SHOW_DATA && (
          <>
            <Section marginTop={10} marginBottom={0}>
              <Text style={{color: '#333333', fontSize: 16}}>
                Última atualização: {dtUltimaAtualizacao}
              </Text>
            </Section>
            <Section marginTop={10}>
              <SolicitacaoBox
                {...findEndereco(lista, currentSolicitacao)}
                /*position = {findListaPosition(currentSolicitacao, roteirizacao)}*/
              />
            </Section>
            <Section type="row" marginTop={8} marginBottom={40} between>
              <StatusBox
                theme={themes.status.success.primary}
                title="Recebidos"
                text={
                  findEndereco(lista, currentSolicitacao).listaVolumes.filter(
                    f => f.dtLeituraFirstMile !== '',
                  ).length
                }
              />
              <View style={{marginRight: 20}} />
              <StatusBox
                theme={themes.status.error.primary}
                title="Pendentes"
                text={
                  findEndereco(lista, currentSolicitacao).listaVolumes.filter(
                    f => f.dtLeituraFirstMile === '',
                  ).length
                }
              />
            </Section>
            <Section>
              {[2].includes(
                findEndereco(lista, currentSolicitacao).situacao ??
                  idStatusLista['APROVADO'],
              ) && (
                <Button
                  label="Iniciar Recebimento"
                  marginHorizontal
                  marginBottom={8}
                  loading={requestStartReceivingLista.loading}
                  disabled={requestStartReceivingLista.loading}
                  onPress={() => {
                    Alert.alert(
                      'Atenção',
                      'Deseja iniciar o recebimento da lista?',
                      [
                        {text: 'Não', style: 'cancel'},
                        {text: 'Sim', onPress: handleStart},
                      ],
                    );
                  }}
                />
              )}
              {[3].includes(
                findEndereco(lista, currentSolicitacao).situacao ??
                  idStatusLista['APROVADO'],
              ) && (
                <Button
                  label="Continuar Recebimento"
                  marginHorizontal
                  marginBottom={8}
                  loading={requestStartReceivingEndereco.loading}
                  disabled={requestStartReceivingEndereco.loading}
                  onPress={redirectScan}
                />
              )}
              {[2, 3, 6].includes(
                findEndereco(lista, currentSolicitacao).situacao ??
                  idStatusLista['APROVADO'],
              ) && (
                <Button
                  label="Cancelar Recebimento"
                  color={[
                    themes.status.error.primary,
                    themes.status.error.secondary,
                  ]}
                  marginHorizontal
                  marginBottom={8}
                  loading={requestCancelEnderecoLista.loading}
                  disabled={requestCancelEnderecoLista.loading}
                  onPress={() => {
                    Alert.alert(
                      'Atenção',
                      'Deseja cancelar o recebimento desse endereço?',
                      [
                        {text: 'Não', style: 'cancel'},
                        {text: 'Sim', onPress: handleCancelEndereco},
                      ],
                    );
                  }}
                />
              )}
              {[3, 7].includes(
                findEndereco(lista, currentSolicitacao).situacao ??
                  idStatusLista['APROVADO'],
              ) && (
                <Button
                  label="Finalizar Recebimento"
                  color={[
                    themes.status.success.primary,
                    themes.status.success.secondary,
                  ]}
                  marginHorizontal
                  loading={
                    requestSaveLista.loading || requestSendLeituraLista.loading
                  }
                  disabled={
                    requestSaveLista.loading || requestSendLeituraLista.loading
                  }
                  onPress={() => {
                    if (
                      findEndereco(lista, currentSolicitacao).listaVolumes.some(
                        f => f.dtLeituraFirstMile !== '',
                      )
                    ) {
                      handleSend();
                    } else {
                      Alert.alert(
                        'Atenção',
                        'Não é possível finalizar o recebimento sem escanear ao menos um volume!',
                        [{text: 'Ok'}],
                      );
                    }
                  }}
                />
              )}
            </Section>
          </>
        )}
      </Render>
      <SuccessModal
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        redirect={redirectList}
      />
    </>
  );
};

export default SolicitacaoReceivement;
