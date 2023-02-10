import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {BoxContentProps, SolicitacaoBoxProps} from './types';
import copyAddress from '../../../../scripts/copyAddress';
import {Endereco, Lista} from '../../../../interfaces/Lista';
import getFullAddress from '../../../../scripts/getFullAddress';
import getStatus from '../../../../scripts/getStatus';
import {elevation} from '../../../../../../styles/layout';
import * as S from './styles';

const BoxContent: React.FC<any> = ({
  situacao,
  listaEnderecos,
  rota,
  qtdeTotalVolumes,
}) => {
  // const enderecoCompleto = getFullAddress(endereco);
  const status = getStatus(situacao);

  return (
    <>
      {/* <S.PositionIndicator theme = {status.theme.tertiary}>
                <Text style = {{ color: status.theme.primary, fontSize: 16, fontWeight: 'bold' }}>{endereco.position}</Text>
            </S.PositionIndicator> */}
      <List.Item
        title={rota}
        titleNumberOfLines={3}
        description={`Volumes: ${qtdeTotalVolumes}`}
        left={props => (
          <List.Icon {...props} icon="store" color={status.theme.primary} />
        )}
      />
      <List.Item
        title=" Total de Coletas"
        description={listaEnderecos.length}
        left={props => (
          <List.Icon
            {...props}
            icon="truck-delivery"
            color={status.theme.primary}
          />
        )}
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

interface ICard {
  situacao: number;
  rota: string;
  qtdeTotalVolumes: number;
  onPress?: () => void;
  listaEnderecos: Endereco[];
}

const CardBox: React.FC<ICard> = ({
  situacao,
  rota,
  qtdeTotalVolumes,
  onPress,
  listaEnderecos,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={[S.styles.Box, elevation.elevation4]}>
          <BoxContent
            listaEnderecos={listaEnderecos}
            qtdeTotalVolumes={qtdeTotalVolumes}
            rota={rota}
            situacao={situacao} /*position = {position}*/
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CardBox;
