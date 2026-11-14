import { z } from 'zod';
import { CardCondition, CardGame, CardRarity } from '../types/card';

export const JUEGOS: readonly [CardGame, ...CardGame[]] = ['pokemon', 'yugioh', 'magic'];

export const RAREZAS: readonly [CardRarity, ...CardRarity[]] = [
  'Common',
  'Uncommon',
  'Rare',
  'Ultra Rare',
  'Secret Rare',
  'Legendary',
];

export const CONDICIONES: readonly [CardCondition, ...CardCondition[]] = [
  'Mint',
  'Near Mint',
  'Excellent',
  'Good',
  'Light Played',
  'Played',
];

export const cartaSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(60, 'El nombre no puede pasar de 60 caracteres'),
  setName: z
    .string()
    .trim()
    .min(3, 'Indica la expansión o colección (mínimo 3 caracteres)')
    .max(60, 'Máximo 60 caracteres'),
  game: z.enum(JUEGOS, { message: 'Elige el juego de cartas' }),
  rarity: z.enum(RAREZAS, { message: 'Selecciona una rareza' }),
  condition: z.enum(CONDICIONES, { message: 'Indica el estado de la carta' }),
  avgPrice: z
    .string()
    .trim()
    .min(1, 'Ingresa el precio estimado')
    .refine(
      (val) => {
        const num = Number(val);
        return !Number.isNaN(num) && num > 0 && num <= 100000;
      },
      { message: 'Ingresa un precio válido mayor a 0 (máximo 100,000)' }
    ),
  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(300, 'Máximo 300 caracteres'),
});

export type CartaFormValues = z.infer<typeof cartaSchema>;

export const cartaVacia: CartaFormValues = {
  name: '',
  setName: '',
  game: '' as CardGame,
  rarity: '' as CardRarity,
  condition: '' as CardCondition,
  avgPrice: '',
  description: '',
};
