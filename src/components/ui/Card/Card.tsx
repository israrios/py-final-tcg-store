import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { CardProps, CardVariant } from './Card.types';

const getVariantStyle = (variant: CardVariant, theme: any) => {
  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: theme.colors.semantic.surface,
        ...theme.shadows.base,
      };
    case 'outlined':
      return {
        backgroundColor: theme.colors.semantic.surface,
        borderWidth: 1,
        borderColor: theme.colors.neutral[300],
      };
    case 'filled':
      return {
        backgroundColor: theme.colors.neutral[100],
      };
  }
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  onPress,
  padding,
  children,
  style,
  ...rest
}) => {
  const theme = useTheme();

  const cardStyle = [
    styles.base,
    { borderRadius: theme.borderRadius.md, padding: padding ?? theme.spacing[4] },
    getVariantStyle(variant, theme),
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.85} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
