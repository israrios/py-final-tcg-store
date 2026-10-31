import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { LoginForm } from '../../components/forms/LoginForm';
import { useTheme } from '../../hooks/useTheme';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavProp>();
  const theme = useTheme();

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('[LoginScreen] login exitoso:', credentials.email);
    navigation.replace('MainTabs', undefined);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.semantic.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { padding: theme.spacing[4] }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconPlaceholder, { backgroundColor: theme.colors.primary[50] }]}>
              <Ionicons name="card-outline" size={36} color={theme.colors.primary[500]} />
            </View>
            <Text style={[styles.appName, { color: theme.colors.neutral[900] }]}>
              TCG Store App
            </Text>
          </View>

          {/* Formulario en Card */}
          <Card variant="outlined" style={styles.formCard}>
            <Text style={[styles.formTitle, { color: theme.colors.neutral[800] }]}>
              Ingreso al Sistema
            </Text>
            <Text style={[styles.formSubtitle, { color: theme.colors.neutral[500] }]}>
              Ingresa tus credenciales para continuar:
            </Text>

            <LoginForm
              onLogin={handleLogin}
              onForgotPassword={() => console.log('Olvido contraseña')}
            />
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={{ fontSize: 12, color: theme.colors.neutral[400], textAlign: 'center' }}>
              Universidad • Sistemas Móviles
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  iconPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
  },
  formCard: {
    padding: 20,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 18,
  },
  footer: {
    marginTop: 12,
  },
});
