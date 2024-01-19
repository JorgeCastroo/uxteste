import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenHeaderProps} from './types';

import HeaderMenu from './Menu';

const Header: React.FC<ScreenHeaderProps> = ({cancel, title, configScreen}) => {
  const navigation = useNavigation<any>();

  return (
    <Appbar.Header style={{width: '100%', backgroundColor: '#fff159'}}>
      <Appbar.Content title={title} color="blue" />
      <HeaderMenu cancel={cancel} configScreen={configScreen} />
    </Appbar.Header>
  );
};

export default Header;
