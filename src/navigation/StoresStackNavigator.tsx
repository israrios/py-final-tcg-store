import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoresStackParamList } from './types';
import { StoresListScreen } from '../screens/stores/StoresListScreen';
import { StoreDetailScreen } from '../screens/stores/StoreDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<StoresStackParamList>();

export const StoresStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary[500] },
        headerTintColor: colors.neutral[0],
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="StoresList" component={StoresListScreen} options={{ title: 'Tiendas' }} />
      <Stack.Screen name="StoreDetail" component={StoreDetailScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
};
