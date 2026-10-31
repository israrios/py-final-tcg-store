import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { createButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  onPress,
  ...rest
}) => {
  const theme = useTheme();
  const { base, variantStyles, textVariantStyles, sizeStyles, textSizeStyles } =
    createButtonStyles(theme);

  const isDisabled = disabled || loading;

  const buttonStyle: ViewStyle[] = [
    base.button,
    variantStyles[variant] as ViewStyle,
    sizeStyles[size] as ViewStyle,
    fullWidth ? (base.fullWidth as ViewStyle) : {},
    isDisabled ? (base.disabled as ViewStyle) : {},
  ];

  const textStyle: TextStyle[] = [
    base.text,
    textVariantStyles[variant] as TextStyle,
    textSizeStyles[size] as TextStyle,
  ];

  const spinnerColor =
    variant === 'primary' || variant === 'danger'
      ? theme.colors.neutral[0]
      : theme.colors.primary[500];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          {leftIcon}
          <Text style={textStyle}>{children}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};
