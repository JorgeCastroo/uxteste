import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {elevation} from '../../styles/layout';
import Icon from 'react-native-vector-icons/Feather';
import themes from '../../styles/themes';
import Button from '../Button';
import storage from '../../utils/storage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import send from '../../modules/solicitacao/screens/SolicitacaoReceivement/scripts/send';
import getVolumes from '../../modules/solicitacao/scripts/getVolumes';
import {
  updateEnderecoSituacao,
  updateListaSituacao,
} from '../../modules/solicitacao/reducers/lista/listaReducer';
import {useNavigation} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

interface IModal {
  close?: () => void;
  logout?: () => void;
  back: () => void;
}

const ModalAlert: React.FC<IModal> = ({back, logout, close}) => {
  const netInfo = useNetInfo();

  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<any>();
  const {network} = useAppSelector(s => s.app);
  const {userData} = useAppSelector(s => s.auth);
  const {lista} = useAppSelector(s => s.lista);

  const redirectList = () => {};
  const openModal = () => {};

  const storeData = async () => {
    try {
      const result = await storage.getItem('@_ListaPeding');
      setPending(result);
    } catch (e) {}
  };

  useEffect(() => {
    storeData();
  }, []);

  async function SendAtt() {
    await pending.map((item: any) => {
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
    await back;
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={close}
        style={{
          flex: 2,
          width: '100%',
          zIndex: 9,
        }}
      />
      <View
        style={[
          elevation.elevation5,
          {
            backgroundColor: 'white',
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
            padding: 30,
          },
        ]}>
        <Icon
          name="alert-triangle"
          size={60}
          color={themes.status.pending.primary}
          style={{marginBottom: 20}}
        />
        {netInfo ? (
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 18}}>
            Existem recebimentos pendentes ! {'\n'}Ao sair você perdera todo o
            recebimento, deseja realmente sair?
          </Text>
        ) : (
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 18}}>
            Existem recebimentos pendentes ! {'\n'}Ao sair você perdera todo o
            recebimento, deseja realmente sair?
          </Text>
        )}

        {netInfo.isInternetReachable ? (
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 16,
              marginTop: 20,
            }}>
            Faça o envio antes de sair.
          </Text>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 16,
              marginTop: 20,
            }}>
            Você esta sem conexão com a internet {'\n'} Procure um local com
            conexão para enviar seus recebimentos.
          </Text>
        )}
        <View
          style={{
            marginTop: 40,
            margin: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 80}}>
            <Button
              label="Sair"
              color={themes.gradient.danger}
              onPress={logout}
            />
          </View>
          <Button
            label="Enviar"
            color={themes.gradient.tertiary}
            onPress={SendAtt}
            disabled={!netInfo.isInternetReachable}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={close}
        style={{
          flex: 2,
          zIndex: 9,
          width: '100%',
        }}
      />
    </View>
  );
};

export default ModalAlert;
