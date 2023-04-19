import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SolicitacaoRoutesParams} from '../../interfaces/SolicitacaoRoutesParams';
import {Endereco} from '../../interfaces/Lista';
import themes from '../../../../styles/themes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  setCurrentLista,
  setCurrentSolicitacao,
  updateListaSituacao,
} from '../../reducers/lista/listaReducer';
import {resetScannedSolicitacoes} from '../../reducers/solicitacaoScan/solicitacaoScanReducer';
import Header from '../../../../components/Screen/Header';
import Render from '../../../../components/Screen/Render';
import Section from '../../../../components/Screen/Section';
import SolicitacaoBox from '../../components/SolicitacaoBox';
import NoData from '../../../../components/NoData';
import SolicitacaoListSearchbar from './components/Searchbar';
import FormError from '../../../../components/Form/Error';
import Button from '../../../../components/Button';
import Loader from './components/Loader';
import localGetLista from '../../scripts/local/localGetLista';
import getAddresses from '../../scripts/getAddresses';
import findLista from '../../scripts/findLista';
import closeLista from '../../scripts/requests/requestCloseLista';
import storage from '../../../../utils/storage';
import getVolumes from '../../scripts/getVolumes';
import send from '../SolicitacaoReceivement/scripts/send';
import cancel from '../SolicitacaoReceivement/scripts/cancel';

const SolicitacaoList: React.FC<
  StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>
> = ({route, navigation}) => {
  const selectedLista = route.params;

  const dispatch = useAppDispatch();
  const {lista, filteredEnderecos, loadingNewLista} = useAppSelector(
    s => s.lista,
  );
  const [peding, setpeding] = useState<any>();

  const {userData} = useAppSelector(s => s.auth);
  const {dtUltimaAtualizacao} = useAppSelector(s => s.app);

  const {requestGetLista, requestCloseLista} = useAppSelector(
    s => s.requestLista,
  );

  const {network} = useAppSelector(s => s.app);

  const [allIsSync, setAllIsSync] = useState(true);

  const SHOW_LOADING = loadingNewLista;
  const SHOW_NO_DATA = !SHOW_LOADING && !lista;
  const SHOW_DATA = !SHOW_LOADING && !!lista && lista.length > 0;

  const SHOW_FILTERED_LISTA_DATA = !SHOW_LOADING && !!filteredEnderecos;
  const SHOW_FILTERED_LISTA_NO_DATA =
    !SHOW_LOADING && !!filteredEnderecos && filteredEnderecos.length === 0;

  const SHOW_LISTA_NO_DATA =
    !SHOW_LOADING && !SHOW_FILTERED_LISTA_DATA && !!lista && lista.length === 0;

  const loaderPercent = requestGetLista.data ? 100 : 0;

  const handleNavigate = (item: Endereco) => {
    dispatch(setCurrentLista(findLista(lista!, item.idLista)));
    dispatch(setCurrentSolicitacao(item));
    dispatch(resetScannedSolicitacoes());
    navigation.navigate('solicitacaoReceivement');
  };

  const redirectList = () => navigation.navigate('rotas');
  const storeData = async () => {
    try {
      const result = await storage.getItem('@_ListaPeding');
      setpeding(result);
    } catch (e) {}
  };
  const openModal = () => {};

  var status = selectedLista.listaEnderecos.map(endereco => {
    return (
      endereco.listaVolumes.filter(f => f.dtLeituraFirstMile !== '').length > 0
    );
  });
  const handleFinishi = async () => {
    if (peding) {
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
      });
      await storage.setItem('@_ListaPeding', null);
    }

    if (status?.filter(item => item == true).length > 0) {
      await closeLista(
        dispatch,
        [selectedLista].map(f => f.idLista),
      );
    } else {
      cancel(
        dispatch,
        !!network,
        redirectList,
        userData!,
        selectedLista.idLista,
        'App Sistema: Cancelamento de romaneio first mile, devido nenhuma leitura de volume.',
      );
    }
    await redirectList();
  };

  useEffect(() => {
    storeData();
  }, []);

  return (
    <>
      <Render
        statusBarOptions={{
          barStyle: 'light-content',
          backgroundColor: themes.colors.primary,
        }}
        paddingBottom={20}
        align={SHOW_LOADING ? 'space-between' : undefined}
        onRefresh={async () => await localGetLista(dispatch)}>
        <Header
          title="Listas"
          screenName="solicitacaoList"
          goBack={false}
          idList={selectedLista.idLista}
        />
        {SHOW_LOADING && <Loader percent={loaderPercent} />}
        {SHOW_NO_DATA && (
          <NoData emoji="confused" message={['Você não possui listas!']} />
        )}
        <FormError
          visible={!allIsSync}
          marginTop={24}
          message="Ainda faltam listas para sincronizar!"
        />
        {SHOW_DATA && (
          <>
            <Section marginTop={10} marginBottom={0}>
              <Text style={{color: '#333333', fontSize: 16}}>
                Última atualização: {dtUltimaAtualizacao}
              </Text>
            </Section>
            <SolicitacaoListSearchbar />
            <Section marginTop={10}>
              {SHOW_FILTERED_LISTA_NO_DATA && (
                <NoData
                  emoji="confused"
                  message={['Nenhum endereço encontrado!']}
                />
              )}
              {SHOW_FILTERED_LISTA_DATA &&
                filteredEnderecos.map((item, index) => (
                  <SolicitacaoBox
                    {...item}
                    key={index}
                    //position = {findListaPosition(item, roteirizacao)}
                    onPress={() => handleNavigate(item)}
                  />
                ))}
              {SHOW_LISTA_NO_DATA && (
                <NoData
                  emoji="confused"
                  message={['Nenhum endereço em aberto!']}
                />
              )}
              {selectedLista &&
                getAddresses([selectedLista]).map((item, index) => (
                  <SolicitacaoBox
                    {...item}
                    key={index}
                    onPress={() => handleNavigate(item)}
                  />
                ))}
            </Section>
            <Section>
              <Button
                label={
                  status?.filter(item => item == true).length > 0
                    ? 'Finalizar Rota'
                    : ' Cancelar Rota'
                }
                color={
                  status?.filter(item => item == true).length > 0
                    ? themes.gradient.success
                    : themes.gradient.danger
                }
                marginHorizontal
                disabled={requestCloseLista.loading}
                loading={requestCloseLista.loading}
                onPress={() => {
                  Alert.alert(
                    'Atenção',
                    'Deseja finalizar a rota? \n\n Os endereços que não tiveram itens lidos vão ser cancelados!',
                    [
                      {text: 'Não', style: 'cancel'},
                      {
                        text: 'Sim',
                        onPress: handleFinishi,
                      },
                    ],
                  );
                }}
              />
            </Section>
          </>
        )}
        <Section />
      </Render>
    </>
  );
};

export default SolicitacaoList;
