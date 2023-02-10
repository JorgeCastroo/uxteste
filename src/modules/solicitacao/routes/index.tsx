import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {SolicitacaoRoutesParams} from '../interfaces/SolicitacaoRoutesParams';
import SolicitacaoList from '../screens/SolicitacaoList';
import SolicitacaoReceivement from '../screens/SolicitacaoReceivement';
import SolicitacaoScan from '../screens/SolicitacaoScan';
import SolicitacaoScanList from '../screens/SolicitacaoScanList';
import GroupListas from '../screens/Listas/index';

const SolicitacaoRoutes: React.FC = () => {
  const Stack = createStackNavigator<SolicitacaoRoutesParams>();

  return (
    <Stack.Navigator
      initialRouteName="rotas"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="rotas" component={GroupListas} />
      <Stack.Screen name="solicitacaoList" component={SolicitacaoList} />
      <Stack.Screen
        name="solicitacaoReceivement"
        component={SolicitacaoReceivement}
      />
      <Stack.Screen name="solicitacaoScan" component={SolicitacaoScan} />
      <Stack.Screen
        name="solicitacaoScanList"
        component={SolicitacaoScanList}
      />
    </Stack.Navigator>
  );
};

export default SolicitacaoRoutes;
