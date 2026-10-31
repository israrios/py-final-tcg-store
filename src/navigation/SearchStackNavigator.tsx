import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from './types';
import { SearchScreen } from '../screens/search/SearchScreen';
import { CardDetailScreen } from '../screens/home/CardDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary[500] },
        headerTintColor: colors.neutral[0],
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar' }} />
      <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
};
