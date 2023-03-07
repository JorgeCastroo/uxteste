import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabItemProps} from './types';
import themes from '../../../../../styles/themes';
import {TouchableOpacity} from 'react-native';

const TabItem: React.FC<TabItemProps> = ({icon, active, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5
        name={icon}
        size={28}
        color={active ? themes.colors.primary : '#CBCBCB'}
      />
    </TouchableOpacity>
  );
};

export default TabItem;
