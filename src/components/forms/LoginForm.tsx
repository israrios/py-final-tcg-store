import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';

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
  onRegister,
  loading = false,
  errorMessage,
}) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    console.log('[LoginForm] onLogin', { email, password });
    onLogin?.({ email, password });
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

      <Input
        label="Correo electrónico"
        placeholder="tu@correo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <View style={{ height: theme.spacing[4] }} />

      <Input
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        variant="password"
      />

      <View style={{ height: theme.spacing[6] }} />

      <Button onPress={handleLogin} fullWidth loading={loading}>
        Iniciar sesión
      </Button>

      <View style={{ height: theme.spacing[4] }} />

      <Button variant="ghost" onPress={() => { console.log('[LoginForm] forgotPassword'); onForgotPassword?.(); }} fullWidth>
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  errorBanner: {},
});
