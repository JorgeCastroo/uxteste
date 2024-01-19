import React, {useState} from 'react';
import {Alert, Linking, Modal} from 'react-native';
import {Appbar, Divider, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {APP_VERSION} from '../../../../../config';
import CancelModal from '../../../../solicitacao/components/CancelModal';
import {useActions} from '../../../services/useActions';
import setUserLogout from '../../../../auth/scripts/setUserLogout';
import {useAppDispatch} from '../../../../../redux/hooks';
import {set} from 'react-native-reanimated';

type HeaderMenuProps = {
  cancel?: boolean;
  configScreen?: boolean;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({configScreen}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const [menuVisible, setMenuVisible] = useState(false);
  const {cancelOperation} = useActions();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [reason, setReason] = useState('');

  const navigation = useNavigation<any>();

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color="blue"
            onPress={() => setMenuVisible(!menuVisible)}
          />
        }>
        <Menu.Item
          icon="logout"
          title="Sair"
          onPress={() => {
            setUserLogout(dispatch, () => navigation.navigate('home'));
            setMenuVisible(false);
          }}
        />
        {!configScreen && (
          <Menu.Item
            icon="file-cancel"
            title="Cancelar operação"
            onPress={() => {
              Alert.alert('Atenção', 'Deseja cancelar a operação?', [
                {text: 'Não', style: 'cancel'},
                {
                  text: 'Sim',
                  onPress: () => {
                    setMenuVisible(false);
                    setOpenCancelModal(true);
                  },
                },
              ]);
            }}
          />
        )}
        <Divider />
        <Menu.Item
          icon={'cellphone-information'}
          title={APP_VERSION}
          onPress={() => Linking.openURL('market://details?id=com.uxfirstmile')}
        />
      </Menu>

      <CancelModal
        open={openCancelModal}
        setOpen={setOpenCancelModal}
        motivo={reason}
        setMotivo={setReason}
        onSubmit={async () => {
          cancelOperation({reason: reason, cancelOperationOption: true});
        }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </>
  );
};

export default HeaderMenu;
