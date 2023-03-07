import React, {useState} from 'react';
import {Alert, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SolicitacaoRoutesParams} from '../../interfaces/SolicitacaoRoutesParams';
import {Endereco} from '../../interfaces/Lista';
import themes from '../../../../styles/themes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  setCurrentLista,
  setCurrentSolicitacao,
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
import {idStatusLista} from '../../../../constants/idStatusLista';
import getAddresses from '../../scripts/getAddresses';
import findLista from '../../scripts/findLista';
import closeLista from '../../scripts/requests/requestCloseLista';

const SolicitacaoList: React.FC<
  StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>
> = ({route, navigation}) => {
  const selectedLista = route.params;

  const dispatch = useAppDispatch();
  const {lista, filteredEnderecos, loadingNewLista} = useAppSelector(
    s => s.lista,
  );
  const {userData} = useAppSelector(s => s.auth);
  const {dtUltimaAtualizacao} = useAppSelector(s => s.app);

  const {requestGetLista, requestCloseLista} = useAppSelector(
    s => s.requestLista,
  );

  const [allIsSync, setAllIsSync] = useState(true);

  const SHOW_LOADING = loadingNewLista;
  const SHOW_NO_DATA = !SHOW_LOADING && !lista;
  const SHOW_DATA = !SHOW_LOADING && !!lista && lista.length > 0;

  const SHOW_FILTERED_LISTA_DATA = !SHOW_LOADING && !!filteredEnderecos;
  const SHOW_FILTERED_LISTA_NO_DATA =
    !SHOW_LOADING && !!filteredEnderecos && filteredEnderecos.length === 0;

  const SHOW_LISTA_DATA = !SHOW_LOADING && !SHOW_FILTERED_LISTA_DATA && !!lista;
  const SHOW_LISTA_NO_DATA =
    !SHOW_LOADING && !SHOW_FILTERED_LISTA_DATA && !!lista && lista.length === 0;

  const loaderPercent = requestGetLista.data ? 100 : 0;

  const handleNavigate = (item: Endereco) => {
    dispatch(setCurrentLista(findLista(lista!, item.idLista)));
    dispatch(setCurrentSolicitacao(item));
    dispatch(resetScannedSolicitacoes());
    navigation.navigate('solicitacaoReceivement');
  };

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
        <Header title="Listas" screenName="solicitacaoList" goBack={false} />
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
                    //position = {findListaPosition(item, roteirizacao)}
                    onPress={() => handleNavigate(item)}
                  />
                ))}
            </Section>
            <Section>
              <Button
                label="Finalizar Rota"
                color={themes.gradient.success}
                marginHorizontal
                disabled={
                  requestCloseLista.loading ||
                  !lista.every(f =>
                    [
                      idStatusLista['FINALIZADO'],
                      idStatusLista['CANCELADO'],
                    ].includes(f.situacao),
                  )
                }
                loading={requestCloseLista.loading}
                onPress={() => {
                  Alert.alert('Atenção', 'Deseja finalizar a rota?', [
                    {text: 'Não', style: 'cancel'},
                    {
                      text: 'Sim',
                      onPress: () =>
                        closeLista(
                          dispatch,
                          lista.map(f => f.idLista),
                        ),
                    },
                  ]);
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
