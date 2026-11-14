import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button/Button';
import { InputRef } from '../ui/Input/Input';
import { FormField } from '../FormField';
import { loginSchema, loginVacio, LoginFormValues } from '../../schemas/loginSchema';

interface LoginFormProps {
  onLogin?: (credentials: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  loading?: boolean;
  errorMessage?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onForgotPassword,
  loading = false,
  errorMessage,
}) => {
  const theme = useTheme();
  const passwordRef = useRef<InputRef>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginVacio,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (datos: LoginFormValues) => {
    console.log('[LoginForm] onLogin', { email: datos.email });
    onLogin?.(datos);
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: '#FFEBEE',
              borderRadius: theme.borderRadius.base,
              padding: theme.spacing[3],
              marginBottom: theme.spacing[4],
            },
          ]}
        >
          <Text style={{ color: theme.colors.semantic.error, fontSize: theme.typography.fontSizes.sm }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <FormField
        control={control}
        name="email"
        label="Correo electrónico"
        placeholder="tu@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <View style={{ height: theme.spacing[4] }} />

      <FormField
        ref={passwordRef}
        control={control}
        name="password"
        label="Contraseña"
        placeholder="••••••••"
        variant="password"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="send"
        onSubmitEditing={() => handleSubmit(onSubmit)()}
      />

      <View style={{ height: theme.spacing[6] }} />

      <Button
        onPress={() => handleSubmit(onSubmit)()}
        fullWidth
        loading={loading || isSubmitting}
        disabled={loading || isSubmitting}
      >
        Iniciar sesión
      </Button>

      <View style={{ height: theme.spacing[4] }} />

      <Button
        variant="ghost"
        onPress={() => {
          console.log('[LoginForm] forgotPassword');
          onForgotPassword?.();
        }}
        fullWidth
      >
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  errorBanner: {},
});
