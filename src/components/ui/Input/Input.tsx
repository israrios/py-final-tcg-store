import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  helperText,
  errorMessage,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  secureTextEntry,
  editable = true,
  ...rest
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = variant === 'password' || secureTextEntry;
  const hasError = !!errorMessage;

  const borderColor = hasError
    ? theme.colors.semantic.error
    : focused
    ? theme.colors.primary[500]
    : theme.colors.neutral[300];

  const styles = StyleSheet.create({
    container: { width: '100%' },
    label: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.neutral[700],
      marginBottom: theme.spacing[1],
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor,
      borderRadius: theme.borderRadius.base,
      backgroundColor: editable ? theme.colors.neutral[0] : theme.colors.neutral[100],
      paddingHorizontal: theme.spacing[3],
      minHeight: 48,
    },
    input: {
      flex: 1,
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.neutral[900],
      paddingVertical: theme.spacing[3],
    },
    helperText: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.neutral[500],
      marginTop: theme.spacing[1],
    },
    errorText: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.semantic.error,
      marginTop: theme.spacing[1],
    },
    iconLeft: { marginRight: theme.spacing[2] },
    iconRight: { marginLeft: theme.spacing[2] },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
        {variant === 'search' && !leftIcon ? (
          <View style={styles.iconLeft}>
            <Ionicons name="search" size={18} color={theme.colors.neutral[500]} />
          </View>
        ) : null}
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword && !passwordVisible}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={editable}
          placeholderTextColor={theme.colors.neutral[400]}
          {...rest}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setPasswordVisible((v) => !v)}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.neutral[500]}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconRight}>{rightIcon}</View>
        ) : null}
      </View>
      {hasError ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};
