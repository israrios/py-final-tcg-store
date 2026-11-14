import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  max = 5,
}) => {
  const theme = useTheme();
  const stars = Array.from({ length: max }, (_, idx) => idx + 1);

  return (
    <View style={styles.row}>
      {stars.map((star) => {
        const active = star <= value;
        return (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            accessibilityRole="button"
            accessibilityLabel={`Calificar con ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
            hitSlop={6}
            style={styles.starBtn}
          >
            <Ionicons
              name={active ? 'star' : 'star-outline'}
              size={30}
              color={active ? '#F59E0B' : theme.colors.neutral[400]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starBtn: {
    paddingVertical: 4,
  },
});
