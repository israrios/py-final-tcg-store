import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme';
import { ButtonVariant, ButtonSize } from './Button.types';

export const createButtonStyles = (theme: Theme) => {
  const variantStyles: Record<ButtonVariant, object> = {
    primary: {
      backgroundColor: theme.colors.primary[500],
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: theme.colors.primary[100],
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: theme.colors.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    danger: {
      backgroundColor: theme.colors.semantic.error,
      borderWidth: 0,
    },
  };

  const textVariantStyles: Record<ButtonVariant, object> = {
    primary: { color: theme.colors.neutral[0] },
    secondary: { color: theme.colors.primary[500] },
    outline: { color: theme.colors.primary[500] },
    ghost: { color: theme.colors.primary[500] },
    danger: { color: theme.colors.neutral[0] },
  };

  const sizeStyles: Record<ButtonSize, object> = {
    sm: {
      height: 32,
      paddingHorizontal: theme.spacing[3],
      borderRadius: theme.borderRadius.sm,
    },
    md: {
      height: 44,
      paddingHorizontal: theme.spacing[4],
      borderRadius: theme.borderRadius.base,
    },
    lg: {
      height: 52,
      paddingHorizontal: theme.spacing[6],
      borderRadius: theme.borderRadius.base,
    },
    xl: {
      height: 60,
      paddingHorizontal: theme.spacing[8],
      borderRadius: theme.borderRadius.md,
    },
  };

  const textSizeStyles: Record<ButtonSize, object> = {
    sm: { fontSize: theme.typography.fontSizes.sm },
    md: { fontSize: theme.typography.fontSizes.base },
    lg: { fontSize: theme.typography.fontSizes.lg },
    xl: { fontSize: theme.typography.fontSizes.xl },
  };

  const base = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[2],
    },
    text: {
      fontWeight: theme.typography.fontWeights.semiBold,
    },
    disabled: {
      opacity: 0.5,
    },
    fullWidth: {
      width: '100%',
    },
  });

  return { base, variantStyles, textVariantStyles, sizeStyles, textSizeStyles };
};
