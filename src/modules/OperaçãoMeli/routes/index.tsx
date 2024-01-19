import React, {useCallback, useEffect, useState} from 'react';

import {ConfigMeli} from '../screens/ConfigMeli/ConfigMeli';
import {AppRoutesParams} from './interfaceRoute';
import {createStackNavigator} from '@react-navigation/stack';
import {OperationMeli} from '../screens/OperationMeli/OperationMeli';
import {useFocusEffect} from '@react-navigation/native';
import storage from '../../../utils/storage';
import {CamScanner} from '../screens/CameraScan/CamScanner';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {setAuthLoading} from '../../auth/reducers/authReducer';
import {useOperation} from '../services/useOperation';

const AppOperationMeli: React.FC = () => {
  const Tab = createStackNavigator<AppRoutesParams>();
  const {idRomaneioMeli} = useAppSelector(s => s.meli);
  const {GetOperation} = useOperation();

  const {authLoading} = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    GetOperation();
    dispatch(setAuthLoading(false));
  }, [authLoading]);
  const loadingScreen = !authLoading;
  console.log(idRomaneioMeli);

  return (
    <>
      {loadingScreen && (
        <Tab.Navigator
          initialRouteName={
            idRomaneioMeli !== null ? 'operationMeli' : 'configMeli'
          }
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen name="configMeli" component={ConfigMeli} />
          <Tab.Screen name="operationMeli" component={OperationMeli} />
          <Tab.Screen name="camScanner" component={CamScanner} />
        </Tab.Navigator>
      )}
    </>
  );
};

export default AppOperationMeli;
