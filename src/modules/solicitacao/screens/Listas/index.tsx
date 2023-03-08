import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SolicitacaoRoutesParams} from '../../interfaces/SolicitacaoRoutesParams';
import {Lista} from '../../interfaces/Lista';
import themes from '../../../../styles/themes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import Header from '../../../../components/Screen/Header';
import Render from '../../../../components/Screen/Render';
import Section from '../../../../components/Screen/Section';
import NoData from '../../../../components/NoData';
import FormError from '../../../../components/Form/Error';
import Loader from './components/Loader';
import localGetLista from '../../scripts/local/localGetLista';
import getAprovados from '../../../coletas/scripts/getAprovado';
import getColetando from '../../../coletas/scripts/getColetando';
import {useIsFocused} from '@react-navigation/native';

import CardBox from './components/CardRotas';

const GroupListas: React.FC<
  StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>
> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {lista, filteredEnderecos, loadingNewLista} = useAppSelector(
    s => s.lista,
  );
  const {userData} = useAppSelector(s => s.auth);
  const {dtUltimaAtualizacao} = useAppSelector(s => s.app);

  const {requestGetLista} = useAppSelector(s => s.requestLista);

  const [allIsSync, setAllIsSync] = useState(true);
  const isFocused = useIsFocused();

  const SHOW_LOADING = loadingNewLista;
  const SHOW_DATA = !SHOW_LOADING && !!lista && lista.length > 0;

  const SHOW_FILTERED_LISTA_DATA = !SHOW_LOADING && !!filteredEnderecos;

  const SHOW_LISTA_NO_DATA =
    !SHOW_LOADING && !SHOW_FILTERED_LISTA_DATA && !!lista && lista.length === 0;

  const loaderPercent = requestGetLista.data ? 100 : 0;

  const handleNavigate = (item: Lista) => {
    navigation.navigate('solicitacaoList', item);
  };

  useEffect(() => {
    if (userData && isFocused) {
      getAprovados(dispatch, userData!, lista!);
      getColetando(dispatch, userData!, lista!);
    }
  }, [dispatch, userData, isFocused]);

  return (
    <>
      <Render
        statusBarOptions={{
          barStyle: 'light-content',
          backgroundColor: themes.colors.primary,
        }}
        paddingBottom={20}
        align={SHOW_LOADING ? 'space-between' : undefined}
        onRefresh={async () => {
          await localGetLista(dispatch);
          await getAprovados(dispatch, userData!, lista!);
          await getColetando(dispatch, userData!, lista!);
        }}>
        <Header title="Rotas" screenName="rotas" goBack={false} />
        {SHOW_LOADING && <Loader percent={loaderPercent} />}
        {!lista && (
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
            <Section marginTop={10}>
              {SHOW_LISTA_NO_DATA && (
                <NoData
                  emoji="confused"
                  message={['Nenhum endereço em aberto!']}
                />
              )}

              {lista &&
                lista.map((item, index) => (
                  <CardBox
                    key={index}
                    rota={item.rota}
                    qtdeTotalVolumes={item.qtdeTotalVolumes}
                    situacao={item.situacao}
                    listaEnderecos={item.listaEnderecos}
                    onPress={() => handleNavigate(item)}
                  />
                ))}
            </Section>
          </>
        )}
        <Section />
      </Render>
    </>
  );
};
export default GroupListas;
