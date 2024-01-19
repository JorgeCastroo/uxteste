import React from 'react';
import {Container} from './styles';
import {ActivityIndicator, Modal} from 'react-native';

interface TransparentLoadingProps {
  visible: boolean;
}

export const TransparentLoading = ({visible}: TransparentLoadingProps) => {
  return (
    <Modal transparent visible={visible}>
      <Container>
        <ActivityIndicator size={50} color={'#fff159'} />
      </Container>
    </Modal>
  );
};
