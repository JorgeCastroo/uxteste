import styled from 'styled-components';

interface Props {
  type: 'qrcode' | 'barcode';
}

export const QRCodeMask = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const QRCodeMaskBlur = styled.View`
  flex: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const QRCodeReaderSquare = styled.View<Props>`
  width: ${({type}) => (type === 'qrcode' ? '250px' : '350px')};
  height: ${({type}) => (type === 'qrcode' ? '250px' : '150px')};
  border: 2px solid #fff;
`;
export const QRCodeSection = styled.View`
  display: flex;
  flex-direction: row;
`;
