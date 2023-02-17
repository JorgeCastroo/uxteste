import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {interval} from 'rxjs';
import {useObservable} from 'beautiful-react-hooks';
import themes from '../../../../styles/themes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import Render from '../../../../components/Screen/Render';
import HomeHeader from '../../components/HomeHeader';
import Section from '../../../../components/Screen/Section';
import TopBox from '../../components/TopBox';
import GroupStatus from '../../components/Group/Status';
import HomeMessage from '../../components/Message';
import SkeletonHomeMessage from '../../components/Message/Skeleton';
import Container from '../../../../components/Container';
import sendAppLocation from '../../../app/scripts/requests/sendAppLocation';
import {getGeolocation} from '../../../app/scripts/geolocationService';
import initPushNotification from '../../../app/scripts/pushNotification/initPushNotification';
import AppVersion from '../../../app/components/AppVersion';
import getColetas from '../../../coletas/scripts/getColetas';
import dayMoment from '../../../../utils/dayMoment';
import getRemainder from '../../../../utils/getRemainder';
import checkListaUpdate from '../../../solicitacao/scripts/checkListaUpdate';
import Button from '../../../../components/Button';
import {useNetInfo} from '@react-native-community/netinfo';
import storage from '../../../../utils/storage';
import {View} from 'react-native';
import getVolumes from '../../../solicitacao/scripts/getVolumes';
import send from '../../../solicitacao/screens/SolicitacaoReceivement/scripts/send';
import {
  updateEnderecoSituacao,
  updateListaSituacao,
} from '../../../solicitacao/reducers/lista/listaReducer';

const Home: React.FC = () => {
  const requestInterval = interval(1000);

  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();
  const [peding, setpeding] = useState<any>();
  const {network, location} = useAppSelector(s => s.app);

  const {userData} = useAppSelector(s => s.auth);
  const {lista} = useAppSelector(s => s.lista);
  const {coletas} = useAppSelector(s => s.coletas);
  //const { roteirizacao } = useAppSelector(s => s.roteirizacao)
  const {requestColeta} = useAppSelector(s => s.requestColetas);
  const isFocused = useIsFocused();

  const [seconds, setSeconds] = useState(0);

  const SHOW_COLETAS_LOADING = requestColeta.loading;
  const SHOW_COLETAS_DATA =
    !SHOW_COLETAS_LOADING && !!coletas && coletas.length > 0;
  const SHOW_DATA = !!lista && !!userData;

  useObservable(requestInterval, setSeconds as any);

  useEffect(() => {
    if (userData) initPushNotification(userData.idUsuarioSistema);
  }, [dispatch, userData]);

  useEffect(() => {
    if (userData && isFocused) getColetas(dispatch, userData);
  }, [dispatch, userData, isFocused]);

  const storeData = async () => {
    try {
      const result = await storage.getItem('@_ListaPeding');
      setpeding(result);
    } catch (e) {}
  };

  useEffect(() => {
    storeData();

    if (getRemainder(seconds, 5)) getGeolocation(dispatch);

    if (
      getRemainder(seconds, 30) &&
      SHOW_DATA &&
      !!location &&
      !!location.coords
    ) {
      sendAppLocation(
        dispatch,
        userData,
        lista.map(i => i.idLista),
        location.coords,
      );
    }

    if (getRemainder(seconds, 60) && SHOW_DATA)
      checkListaUpdate(dispatch, userData);
  }, [dispatch, seconds, SHOW_DATA]);

  const redirectList = () => {};
  const openModal = () => {};

  async function SendAtt() {
    await peding.map((item: any) => {
      const idLista = item.idLista;
      const idRemetente = item.idRemetente;

      send(
        dispatch,
        !!network,
        redirectList,
        openModal,
        userData!,
        idLista,
        idRemetente,
        getVolumes(lista!, item!),
      );
      dispatch(
        updateEnderecoSituacao({status: 'FINALIZADO', idLista, idRemetente}),
      );
      dispatch(updateListaSituacao({status: 'FINALIZADO', idLista}));
    });
    await storage.setItem('@_ListaPeding', null);
  }

  return (
    <>
      <Render
        statusBarOptions={{
          barStyle: 'light-content',
          backgroundColor: themes.colors.primary,
        }}
        align="space-between"
        paddingBottom={24}
        onRefresh={async () => await getColetas(dispatch, userData!)}>
        <Container padding={false}>
          <HomeHeader />
          <TopBox />
          <Section marginTop={30} marginBottom={20}>
            <Text style={{color: '#333333', fontSize: 18}}>{dayMoment()}</Text>
            <Text style={{color: '#333333', fontSize: 24, fontWeight: 'bold'}}>
              {userData?.nomeUsuario ?? 'Usuário'}
            </Text>
          </Section>
          <Section marginBottom={40}>
            {SHOW_COLETAS_DATA ? (
              <></>
            ) : (
              <Button
                label={
                  netInfo.isInternetReachable
                    ? 'Atualizar'
                    : 'Sem conexão com a internet'
                }
                marginHorizontal={true}
                disabled={!netInfo.isInternetReachable}
                onPress={() => getColetas(dispatch, userData!)}
              />
            )}

            {!netInfo.isInternetReachable
              ? SHOW_COLETAS_LOADING && <SkeletonHomeMessage />
              : SHOW_COLETAS_DATA && <HomeMessage />}
          </Section>
          {lista && lista?.length > 0 && (
            <>
              {/* <GroupInfo /> */}
              <GroupStatus />
            </>
          )}

          {peding && (
            <Section marginTop={30} marginBottom={20}>
              <Text
                style={{color: '#333333', fontSize: 24, fontWeight: 'bold'}}>
                Você possui coletas não sincronizadas !
              </Text>

              <View style={{marginTop: 20}}>
                <Button
                  disabled={!netInfo.isInternetReachable}
                  color={themes.gradient.tertiary}
                  label={
                    netInfo.isInternetReachable
                      ? 'Sincronizar'
                      : 'Sem conexão com a internet'
                  }
                  marginHorizontal={true}
                  onPress={SendAtt}
                />
              </View>
            </Section>
          )}
        </Container>
        <AppVersion />
      </Render>
    </>
  );
};

export default Home;
