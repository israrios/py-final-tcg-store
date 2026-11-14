import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cardsReducer, { hidratarCartas, marcarHidratado } from './cardsSlice';

const STORAGE_KEY = 'cards/v1';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hidratar desde AsyncStorage al iniciar
export const cargarCartasPersistidas = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        store.dispatch(hidratarCartas(parsed));
        return;
      }
    }
  } catch (error) {
    console.warn('[Store] Error al leer AsyncStorage:', error);
  }
  store.dispatch(marcarHidratado());
};

// Guardar cambios en AsyncStorage
let prevItems = store.getState().cards.items;
store.subscribe(() => {
  const currentState = store.getState().cards;
  if (currentState.hydrated && currentState.items !== prevItems) {
    prevItems = currentState.items;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentState.items)).catch((err) =>
      console.warn('[Store] Error al persistir cartas:', err)
    );
  }
});
