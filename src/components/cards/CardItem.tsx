import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { CardData } from '../../types/card';
import { Badge } from '../ui/Badge/Badge';
import { formatPrice } from '../../utils/formatters';

export type CardItemVariant = 'list' | 'grid' | 'compact';

interface CardItemProps {
  card: CardData;
  variant?: CardItemVariant;
  onPress?: (cardId: string) => void;
  showPrice?: boolean;
  showRarity?: boolean;
}

const rarityVariant = (rarity: string): any => {
  switch (rarity) {
    case 'Legendary':
    case 'Secret Rare':
      return 'warning';
    case 'Ultra Rare':
      return 'info';
    case 'Rare':
      return 'success';
    default:
      return 'default';
  }
};

const gameLabel: Record<string, string> = {
  pokemon: '🔴 Pokémon',
  yugioh: '🟡 Yu-Gi-Oh!',
  magic: '🟣 Magic',
};

export const CardItem: React.FC<CardItemProps> = ({
  card,
  variant = 'list',
  onPress,
  showPrice = true,
  showRarity = true,
}) => {
  const theme = useTheme();

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compact, { backgroundColor: theme.colors.neutral[0], borderRadius: theme.borderRadius.base, ...theme.shadows.sm }]}
        onPress={() => onPress?.(card.id)}
        activeOpacity={0.85}
      >
        {Boolean(card.image) && (
          <Image source={{ uri: card.image }} style={styles.compactImage} />
        )}
        <View style={styles.compactInfo}>
          <Text style={[styles.name, { fontSize: theme.typography.fontSizes.sm, color: theme.colors.neutral[900] }]} numberOfLines={1}>
            {card.name}
          </Text>
          {showPrice && (
            <Text style={[styles.price, { color: theme.colors.primary[500], fontSize: theme.typography.fontSizes.sm }]}>
              {formatPrice(card.avgPrice)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'grid') {
    return (
      <TouchableOpacity
        style={[styles.grid, { backgroundColor: theme.colors.neutral[0], borderRadius: theme.borderRadius.md, ...theme.shadows.base }]}
        onPress={() => onPress?.(card.id)}
        activeOpacity={0.85}
      >
        {Boolean(card.image) && (
          <Image source={{ uri: card.image }} style={styles.gridImage} />
        )}
        <View style={styles.gridInfo}>
          <Text style={[styles.name, { fontSize: theme.typography.fontSizes.sm, color: theme.colors.neutral[900] }]} numberOfLines={2}>
            {card.name}
          </Text>
          {showRarity && (
            <Badge variant={rarityVariant(card.rarity)} size="sm">
              {card.rarity}
            </Badge>
          )}
          {showPrice && (
            <Text style={[styles.price, { color: theme.colors.primary[500] }]}>
              {formatPrice(card.avgPrice)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // List variant
  return (
    <TouchableOpacity
      style={[styles.list, { backgroundColor: theme.colors.neutral[0], borderRadius: theme.borderRadius.md, ...theme.shadows.sm }]}
      onPress={() => onPress?.(card.id)}
      activeOpacity={0.85}
    >
      {Boolean(card.image) && (
        <Image source={{ uri: card.image }} style={styles.listImage} />
      )}
      <View style={styles.listInfo}>
        <Text style={[styles.name, { color: theme.colors.neutral[900], fontWeight: theme.typography.fontWeights.semiBold }]} numberOfLines={1}>
          {card.name}
        </Text>
        <Text style={[styles.setName, { color: theme.colors.neutral[500], fontSize: theme.typography.fontSizes.sm }]}>
          {card.setName} · {gameLabel[card.game] ?? card.game}
        </Text>
        <View style={styles.row}>
          {showRarity && (
            <Badge variant={rarityVariant(card.rarity)} size="sm">
              {card.rarity}
            </Badge>
          )}
        </View>
      </View>
      {showPrice && (
        <Text style={[styles.listPrice, { color: theme.colors.primary[500], fontWeight: theme.typography.fontWeights.bold }]}>
          {formatPrice(card.avgPrice)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  listImage: { width: 52, height: 72, borderRadius: 4, resizeMode: 'cover' },
  listInfo: { flex: 1, gap: 4 },
  listPrice: { fontSize: 16 },
  name: { fontSize: 15 },
  setName: {},
  price: { fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 4, flexWrap: 'wrap' },
  grid: {
    flex: 1,
    margin: 4,
    overflow: 'hidden',
  },
  gridImage: { width: '100%', height: 140, resizeMode: 'cover' },
  gridInfo: { padding: 8, gap: 4 },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
    width: 150,
    gap: 8,
  },
  compactImage: { width: 36, height: 50, borderRadius: 4, resizeMode: 'cover' },
  compactInfo: { flex: 1 },
});
