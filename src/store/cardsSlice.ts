import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardData, CardGame, CardRarity, CardCondition } from '../types/card';
import { dummyCards } from '../constants/dummyData';

export interface CreateCardPayload {
  name: string;
  setName: string;
  game: CardGame;
  rarity: CardRarity;
  condition: CardCondition;
  avgPrice: number;
  description: string;
}

interface CardsState {
  items: CardData[];
  hydrated: boolean;
}

const initialState: CardsState = {
  items: dummyCards,
  hydrated: false,
};

const GAME_COLORS: Record<CardGame, string> = {
  pokemon: 'FF6B35',
  yugioh: '4A0E8F',
  magic: '1A1A2E',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    agregarCarta: {
      reducer(state, action: PayloadAction<CardData>) {
        state.items.unshift(action.payload);
      },
      prepare(payload: CreateCardPayload) {
        const bg = GAME_COLORS[payload.game] ?? '2E7D32';
        const encodedName = encodeURIComponent(payload.name.slice(0, 14));
        return {
          payload: {
            id: `card_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            name: payload.name,
            setName: payload.setName,
            game: payload.game,
            rarity: payload.rarity,
            condition: payload.condition,
            avgPrice: payload.avgPrice,
            description: payload.description,
            image: `https://placehold.co/200x280/${bg}/FFFFFF?text=${encodedName}`,
          } satisfies CardData,
        };
      },
    },
    actualizarCarta(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Omit<CardData, 'id'>> }>
    ) {
      const idx = state.items.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload.changes };
      }
    },
    eliminarCarta(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    hidratarCartas(state, action: PayloadAction<CardData[]>) {
      state.items = action.payload;
      state.hydrated = true;
    },
    marcarHidratado(state) {
      state.hydrated = true;
    },
  },
});

export const {
  agregarCarta,
  actualizarCarta,
  eliminarCarta,
  hidratarCartas,
  marcarHidratado,
} = cardsSlice.actions;

export const selectAllCards = (state: { cards: CardsState }) => state.cards.items;
export const selectCardById = (cardId: string) => (state: { cards: CardsState }) =>
  state.cards.items.find((c) => c.id === cardId);
export const selectCardsCount = (state: { cards: CardsState }) => state.cards.items.length;

export default cardsSlice.reducer;
