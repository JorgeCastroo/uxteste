import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ControlProps} from './types';
import * as S from './styles';
import {useAppDispatch} from '../../../../redux/hooks';
import {setModalVisible} from '../../../solicitacao/reducers/solicitacaoScan/solicitacaoScanReducer';

const Control: React.FC<ControlProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  return (
    <S.ScanControlsContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}>{` códigos escaneados`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(setModalVisible(true));
        }}>
        <MaterialCommunityIcons name="keyboard" size={24} color="#fff" />
      </TouchableOpacity>
    </S.ScanControlsContainer>
  );
};

export default Control;
