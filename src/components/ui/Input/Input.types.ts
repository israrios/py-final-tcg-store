import { TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export type InputVariant = 'default' | 'search' | 'password';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}
