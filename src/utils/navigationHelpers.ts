import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

export const navigateToCardDetail = (
  navigation: NavigationProp<RootStackParamList>,
  cardId: string
) => {
  // @ts-ignore - nested navigation
  navigation.navigate('HomeTab', {
    screen: 'CardDetail',
    params: { cardId },
  });
};

export const navigateToStoreDetail = (
  navigation: NavigationProp<RootStackParamList>,
  storeId: string
) => {
  // @ts-ignore - nested navigation
  navigation.navigate('StoresTab', {
    screen: 'StoreDetail',
    params: { storeId },
  });
};
