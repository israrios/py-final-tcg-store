// src/navigation/types.ts
// React Navigation 7 - Static API typing

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
};

// Home Stack (nested in HomeTab)
export type HomeStackParamList = {
  Home: undefined;
  CardDetail: { cardId: string };
};

// Search Stack
export type SearchStackParamList = {
  Search: undefined;
  CardDetail: { cardId: string };
};

// Stores Stack
export type StoresStackParamList = {
  StoresList: undefined;
  StoreDetail: { storeId: string };
};

// Profile Stack
export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  ComponentCatalog: undefined;
};

// Main Tabs
export type MainTabParamList = {
  HomeTab:
    | {
        screen: keyof HomeStackParamList;
        params?: HomeStackParamList[keyof HomeStackParamList];
      }
    | undefined;
  SearchTab:
    | {
        screen: keyof SearchStackParamList;
        params?: SearchStackParamList[keyof SearchStackParamList];
      }
    | undefined;
  StoresTab:
    | {
        screen: keyof StoresStackParamList;
        params?: StoresStackParamList[keyof StoresStackParamList];
      }
    | undefined;
  ProfileTab:
    | {
        screen: keyof ProfileStackParamList;
        params?: ProfileStackParamList[keyof ProfileStackParamList];
      }
    | undefined;
};

// Root Stack
export type RootStackParamList = {
  Auth:
    | {
        screen: keyof AuthStackParamList;
        params?: AuthStackParamList[keyof AuthStackParamList];
      }
    | undefined;
  MainTabs:
    | {
        screen: keyof MainTabParamList;
        params?: MainTabParamList[keyof MainTabParamList];
      }
    | undefined;
};

// Global types for useNavigation / useRoute
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
