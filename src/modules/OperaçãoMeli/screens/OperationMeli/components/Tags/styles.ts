import styled from 'styled-components';

import {TouchableRipple} from 'react-native-paper';
// import {Alert, Dimensions} from 'react-native';

export const Scroll = styled.ScrollView``;

export const CardContainer = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Tag = styled.Text`
  margin-left: 8px;
  color: #555555;
  font-size: 18px;
  font-weight: bold;
`;

export const SectionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled(TouchableRipple)`
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const ButtonLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-decoration: underline;
  color: blue;
`;

export const ButtonLabelDanger = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-decoration: underline;
  color: red;
`;
