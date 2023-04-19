import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {SolicitacaoBoxProps} from './types';
import {Endereco} from '../../interfaces/Lista';
import * as S from './styles';
import {elevation} from '../../../../styles/layout';
import getFullAddress from '../../scripts/getFullAddress';
import getStatus from '../../scripts/getStatus';
import copyAddress from '../../scripts/copyAddress';

const BoxContent: React.FC<Endereco> = endereco => {
  const enderecoCompleto = getFullAddress(endereco);
  const status = getStatus(endereco.situacao);  
  return (
    <>
      {/* <S.PositionIndicator theme = {status.theme.tertiary}>
                <Text style = {{ color: status.theme.primary, fontSize: 16, fontWeight: 'bold' }}>{endereco.position}</Text>
            </S.PositionIndicator> */}
      <List.Item
        title={endereco.nomeCliente}
        titleNumberOfLines={3}
        description={`Volumes: ${endereco.listaVolumes.length}`}
        left={props => (
          <List.Icon {...props} icon="store" color={status.theme.primary} />
        )}
      />
      <List.Item
        title="Endereço"
        description={enderecoCompleto}
        left={props => (
          <List.Icon
            {...props}
            icon="map-marker"
            color={status.theme.primary}
          />
        )}
        onPress={() => copyAddress(endereco)}
      />
      <S.StatusContainer theme={status.theme.tertiary}>
        <Text
          style={{
            color: status.theme.primary,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {status.label.toUpperCase()}
        </Text>
      </S.StatusContainer>
    </>
  );
};

const SolicitacaoBox: React.FC<SolicitacaoBoxProps & Endereco> = ({
  position,
  onPress,
  ...props
}) => {
  return (
    <>
      {(!!onPress && (
        <TouchableOpacity
          style={[S.styles.Box, elevation.elevation4]}
          onPress={onPress}>
          <BoxContent {...props} /*position = {position}*/ />
        </TouchableOpacity>
      )) || (
        <View style={[S.styles.Box, elevation.elevation4]}>
          <BoxContent {...props} /*position = {position}*/ />
        </View>
      )}
    </>
  );
};

export default SolicitacaoBox;
