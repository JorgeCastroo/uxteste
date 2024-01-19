import React from 'react';

import * as S from './styles';

type PropsMask = {
  type: 'qrcode' | 'barcode';
};

export const Mask = ({type}: PropsMask) => {
  return (
    <S.QRCodeMask>
      <S.QRCodeMaskBlur />
      <S.QRCodeSection>
        <S.QRCodeMaskBlur />
        <S.QRCodeReaderSquare type={type} />
        <S.QRCodeMaskBlur />
      </S.QRCodeSection>
      <S.QRCodeMaskBlur />
    </S.QRCodeMask>
  );
};
