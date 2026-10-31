import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color,
  thickness = 1,
}) => {
  const theme = useTheme();
  const dividerColor = color ?? theme.colors.semantic.divider;

  if (orientation === 'vertical') {
    return (
      <View
        style={{ width: thickness, backgroundColor: dividerColor, alignSelf: 'stretch' }}
      />
    );
  }

  return (
    <View
      style={{ height: thickness, backgroundColor: dividerColor, width: '100%' }}
    />
  );
};
