import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { StoreData } from '../../types/card';
import { formatDistance, formatRating } from '../../utils/formatters';

export type StoreCardVariant = 'list' | 'card';

interface StoreCardProps {
  store: StoreData;
  variant?: StoreCardVariant;
  onPress?: (storeId: string) => void;
  showDistance?: boolean;
  showRating?: boolean;
  highlightAvailability?: boolean;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  store,
  variant = 'list',
  onPress,
  showDistance = true,
  showRating = true,
  highlightAvailability = true,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.neutral[0],
          borderRadius: theme.borderRadius.md,
          ...theme.shadows.base,
        },
        variant === 'card' && styles.card,
      ]}
      onPress={() => onPress?.(store.id)}
      activeOpacity={0.85}
    >
      {Boolean(store.logo) && (
        <Image source={{ uri: store.logo }} style={styles.logo} />
      )}
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            {
              color: theme.colors.neutral[900],
              fontWeight: theme.typography.fontWeights.semiBold,
              fontSize: theme.typography.fontSizes.base,
            },
          ]}
          numberOfLines={1}
        >
          {store.name}
        </Text>
        <View style={styles.row}>
          {showRating && (
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#F57F17" />
              <Text style={[styles.ratingText, { color: theme.colors.neutral[700], fontSize: theme.typography.fontSizes.sm }]}>
                {formatRating(store.rating)}
              </Text>
            </View>
          )}
          {showDistance && (
            <View style={styles.ratingRow}>
              <Ionicons name="location-outline" size={14} color={theme.colors.neutral[500]} />
              <Text style={[styles.ratingText, { color: theme.colors.neutral[500], fontSize: theme.typography.fontSizes.sm }]}>
                {formatDistance(store.distance)}
              </Text>
            </View>
          )}
        </View>
        {highlightAvailability && (
          <View
            style={[
              styles.availBadge,
              {
                backgroundColor: store.hasCard ? theme.colors.primary[50] : theme.colors.neutral[100],
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <Ionicons
              name={store.hasCard ? 'checkmark-circle' : 'close-circle'}
              size={14}
              color={store.hasCard ? theme.colors.primary[500] : theme.colors.neutral[500]}
            />
            <Text
              style={{
                fontSize: theme.typography.fontSizes.xs,
                color: store.hasCard ? theme.colors.primary[600] : theme.colors.neutral[500],
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              {store.hasCard ? 'Disponible' : 'No disponible'}
            </Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.neutral[400]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  card: {
    padding: 16,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  info: { flex: 1, gap: 4 },
  name: {},
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: {},
  availBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
});
