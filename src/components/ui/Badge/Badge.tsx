import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

const getVariantColors = (variant: BadgeVariant, theme: any) => {
  switch (variant) {
    case 'success':
      return { bg: theme.colors.primary[50], text: theme.colors.primary[600] };
    case 'warning':
      return { bg: '#FFF8E1', text: theme.colors.semantic.warning };
    case 'error':
      return { bg: '#FFEBEE', text: theme.colors.semantic.error };
    case 'info':
      return { bg: '#E3F2FD', text: theme.colors.semantic.info };
    default:
      return { bg: theme.colors.neutral[200], text: theme.colors.neutral[700] };
  }
};

const getSizeStyles = (size: BadgeSize, theme: any) => {
  switch (size) {
    case 'sm':
      return { px: theme.spacing[1], py: 2, fontSize: theme.typography.fontSizes.xs };
    case 'lg':
      return { px: theme.spacing[3], py: theme.spacing[1], fontSize: theme.typography.fontSizes.base };
    default:
      return { px: theme.spacing[2], py: theme.spacing[1], fontSize: theme.typography.fontSizes.sm };
  }
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', size = 'md', children }) => {
  const theme = useTheme();
  const { bg, text } = getVariantColors(variant, theme);
  const { px, py, fontSize } = getSizeStyles(size, theme);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, paddingHorizontal: px, paddingVertical: py, borderRadius: theme.borderRadius.full },
      ]}
    >
      <Text style={[styles.text, { color: text, fontSize, fontWeight: theme.typography.fontWeights.medium }]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start' },
  text: {},
});
