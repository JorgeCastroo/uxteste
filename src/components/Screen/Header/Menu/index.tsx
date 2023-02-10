import React, {useState} from 'react';
import {Alert, Linking} from 'react-native';
import {Appbar, Divider, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {HeaderMenuProps} from './types';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import setUserLogout from '../../../../modules/auth/scripts/setUserLogout';
import CancelModal from '../../../../modules/solicitacao/components/CancelModal';
import cancel from '../../../../modules/solicitacao/screens/SolicitacaoReceivement/scripts/cancel';
import {APP_VERSION} from '../../../../config';
import copySolicitacao from '../../../../modules/solicitacao/scripts/copySolicitacao';
import findEndereco from '../../../../modules/solicitacao/scripts/findEndereco';

const HeaderMenu: React.FC<HeaderMenuProps> = ({screenName}) => {
  const dispatch = useAppDispatch();
  const {network, isVersionDeprected} = useAppSelector(s => s.app);
  const {userData} = useAppSelector(s => s.auth);
  const {lista, currentSolicitacao} = useAppSelector(s => s.lista);

  const [menuVisible, setMenuVisible] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [motivoCancelamento, setMotivoCancelamento] = useState('');

  const navigation = useNavigation<any>();

  const SHOW_LISTA_DATA = screenName === 'solicitacaoList' && !!lista;
  const SHOW_SOLICITACAO_DATA =
    screenName === 'solicitacaoReceivement' && !!currentSolicitacao && !!lista;

  const handleOnPress = (onPress: () => void) => {
    onPress();
    setMenuVisible(false);
  };

  const handleCancel = () => {
        if (lista) {
            console.log("idLista", lista[0].idLista)
            console.log("networknetwork", network)
            console.log("userData", userData)
            console.log("lista", lista)
            cancel(dispatch, !!network, () => navigation.navigate('solicitacaoList'), userData!, lista[0].idLista, motivoCancelamento)
        }
    }

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color="#FFF"
            onPress={() => setMenuVisible(!menuVisible)}
          />
        }>
        {SHOW_LISTA_DATA && (
          <>
            {screenName != 'solicitacaoList' ? (
              <></>
            ) : (
              <Menu.Item
                icon="file-cancel"
                title="Cancelar lista"
                onPress={() => {
                  Alert.alert('Atenção', 'Deseja cancelar a lista?', [
                    {text: 'Não', style: 'cancel'},
                    {
                      text: 'Sim',
                      onPress: () =>
                        handleOnPress(() => setOpenCancelModal(true)),
                    },
                  ]);
                }}
              />
            )}
            {/* <Menu.Item
                            icon = "cancel"
                            title = "DEV Limpar"
                            onPress = {() => handleOnPress(() => removeLista(dispatch))}
                        /> */}
          </>
        )}
        {SHOW_SOLICITACAO_DATA && (
          <Menu.Item
            icon="content-copy"
            title="Copiar solicitação"
            onPress={() =>
              handleOnPress(() =>
                copySolicitacao(findEndereco(lista, currentSolicitacao)),
              )
            }
          />
        )}
        <Menu.Item
          icon="information-outline"
          title="Sobre"
          onPress={() => handleOnPress(() => navigation.navigate('about'))}
        />
        <Menu.Item
          icon="logout"
          title="Sair"
          onPress={() =>
            handleOnPress(() =>
              setUserLogout(dispatch, () => navigation.navigate('home')),
            )
          }
        />
        <Divider />
        <Menu.Item
          icon={
            isVersionDeprected
              ? 'cellphone-arrow-down'
              : 'cellphone-information'
          }
          title={APP_VERSION}
          disabled={!isVersionDeprected}
          onPress={() => Linking.openURL('market://details?id=com.uxfirstmile')}
        />
      </Menu>
      <CancelModal
        open={openCancelModal}
        setOpen={setOpenCancelModal}
        motivo={motivoCancelamento}
        setMotivo={setMotivoCancelamento}
        onSubmit={handleCancel}
      />
    </>
  );
};

export default HeaderMenu;
