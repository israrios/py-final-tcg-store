import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

export type LoaderSize = 'sm' | 'md' | 'lg';
export type LoaderVariant = 'spinner' | 'skeleton';

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: string;
}

const nativeSize: Record<LoaderSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  color,
}) => {
  const theme = useTheme();
  const spinnerColor = color ?? theme.colors.primary[500];

  if (variant === 'skeleton') {
    return (
      <View
        style={[
          styles.skeleton,
          { backgroundColor: theme.colors.neutral[200], borderRadius: theme.borderRadius.base },
        ]}
      />
    );
  }

  return <ActivityIndicator size={nativeSize[size]} color={spinnerColor} />;
};

const styles = StyleSheet.create({
  skeleton: { width: '100%', height: 20 },
});
