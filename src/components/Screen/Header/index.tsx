import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenHeaderProps} from './types';
import themes from '../../../styles/themes';
import {useAppSelector} from '../../../redux/hooks';
import HeaderMenu from './Menu';

const Header: React.FC<ScreenHeaderProps> = ({
  goBack,
  backRoute,
  title,
  subtitle,
  screenName,
  idList,
}) => {
  const {location} = useAppSelector(s => s.app);
  const {syncLoading} = useAppSelector(s => s.sync);
  const {lista} = useAppSelector(s => s.lista);
  const navigation = useNavigation<any>();

  const showBack = goBack ?? true;

  return (
    <Appbar.Header
      style={{width: '100%', backgroundColor: themes.colors.primary}}>
      {showBack && (
        <Appbar.BackAction
          onPress={() =>
            backRoute ? navigation.navigate(backRoute) : navigation.goBack()
          }
        />
      )}
      <Appbar.Content title={title} subtitle={subtitle} />

      {syncLoading && <Appbar.Action icon="sync" />}
      {!!lista && !location && <Appbar.Action icon="map-marker-off-outline" />}
      <HeaderMenu idList={idList} screenName={screenName} />
    </Appbar.Header>
  );
};

export default Header;
