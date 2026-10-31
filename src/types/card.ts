export type CardRarity =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Ultra Rare'
  | 'Secret Rare'
  | 'Legendary';

export type CardGame = 'pokemon' | 'yugioh' | 'magic';

export type CardCondition =
  | 'Mint'
  | 'Near Mint'
  | 'Excellent'
  | 'Good'
  | 'Light Played'
  | 'Played';

export interface CardData {
  id: string;
  name: string;
  image: string;
  rarity: CardRarity;
  setName: string;
  avgPrice: number;
  game: CardGame;
  condition?: CardCondition;
  description?: string;
}

export interface StoreData {
  id: string;
  name: string;
  logo: string;
  distance: number; // km
  rating: number; // 0-5
  hasCard: boolean;
  address: string;
  phone: string;
  website?: string;
  hours: string;
  availableCards: string[]; // card IDs
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  stats: {
    favorites: number;
    searches: number;
    visitedStores: number;
  };
}

export interface SearchFilters {
  game?: CardGame;
  rarity?: CardRarity;
  minPrice?: number;
  maxPrice?: number;
  condition?: CardCondition;
}
