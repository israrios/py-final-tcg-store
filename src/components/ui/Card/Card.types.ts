import { ViewProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends Omit<ViewProps, 'style'> {
  variant?: CardVariant;
  onPress?: () => void;
  padding?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
