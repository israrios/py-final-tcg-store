import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store, cargarCartasPersistidas } from './src/store';
import { SesionProvider } from './src/context/SesionContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    cargarCartasPersistidas();
  }, []);

  return (
    <Provider store={store}>
      <SesionProvider>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </SafeAreaProvider>
      </SesionProvider>
    </Provider>
  );
}
