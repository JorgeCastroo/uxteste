import React from 'react';

import {UnityFinal} from '../../../../services/useUnits';
import * as S from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type OperationProps = {
  typeOperation: number | null;
  originSelected: UnityFinal | undefined;
  destinySelected: UnityFinal | undefined;
};

export const Operation = ({
  destinySelected,
  originSelected,
  typeOperation,
}: OperationProps) => {
  return (
    <S.Operation>
      <S.SectionInfo>
        <S.InfoLabel>Operação:</S.InfoLabel>
        <S.InfoValue>{typeOperation == 1 ? 'LineHall' : 'WHP'}</S.InfoValue>
        {typeOperation == 2 ? (
          <AntDesign
            name="qrcode"
            size={20}
            color="#333"
            style={{marginLeft: 5}}
          />
        ) : (
          <AntDesign
            name="barcode"
            size={20}
            color="#333"
            style={{marginLeft: 5}}
          />
        )}
      </S.SectionInfo>
      <S.SectionInfo>
        <S.InfoLabel>Origem:</S.InfoLabel>
        <S.InfoValue>{originSelected?.label}</S.InfoValue>
        <FontAwesome5
          name="truck-loading"
          size={20}
          color="blue"
          style={{marginLeft: 5}}
        />
      </S.SectionInfo>
      <S.SectionInfo>
        <S.InfoLabel>Destino:</S.InfoLabel>
        <S.InfoValue>{destinySelected?.label}</S.InfoValue>
        <FontAwesome5
          name="map-marked-alt"
          size={20}
          color="blue"
          style={{marginLeft: 5}}
        />
      </S.SectionInfo>
    </S.Operation>
  );
};
