import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
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
import Button from '../../../../components/Button';
import closeLista from '../../scripts/requests/requestCloseLista';
import storage from '../../../../utils/storage';
import getVolumes from '../../scripts/getVolumes';
import send from '../SolicitacaoReceivement/scripts/send';
import cancel from '../SolicitacaoReceivement/scripts/cancel';

const GroupListas: React.FC<
  StackScreenProps<SolicitacaoRoutesParams, 'solicitacaoList'>
> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [peding, setpeding] = useState<any>();
  
  const [lista, setLista] = useState<Lista[]>();

  const {filteredEnderecos, loadingNewLista} = useAppSelector(
    s => s.lista,
  );
  const {network} = useAppSelector(s => s.app);

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

  const redirectList = () => navigation.navigate('rotas');
  const storeData = async () => {
    try {
      const result = await storage.getItem('@_ListaPeding');
      setpeding(result);
    } catch (e) {}
  };
  const openModal = () => {};

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

    lista!.forEach(i => {
      var status = i.listaEnderecos.map(endereco => {
        return (
          endereco.listaVolumes.filter(f => f.dtLeituraFirstMile !== '')
            .length > 0
        );
      });

      if (status?.filter(item => item == true).length > 0) {
        closeLista(dispatch, [i.idLista]);
      } else {
        cancel(
          dispatch,
          !!network,
          () => {},
          userData!,
          i.idLista,
          'App Sistema: Cancelamento de romaneio first mile, devido nenhuma leitura de volume.',
        );
      }
    });

    await redirectList();
  };

  useEffect(() => {
    if (userData && isFocused) {
      const fetchData = async () => {
        let lista = await storage.getItem<Lista[]>('lista');
        setLista(lista!);
        await localGetLista(dispatch);
        await getAprovados(dispatch, userData!, lista!);
        await getColetando(dispatch, userData!, lista!);
      };
      fetchData();
      storeData();
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
        <Section>
          {lista && (
            <Button
              label="Finalizar trajeto"
              color={themes.gradient.success}
              marginHorizontal
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
          )}
        </Section>

        <Section />
      </Render>
    </>
  );
};
export default GroupListas;
