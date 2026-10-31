import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type NavProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const theme = useTheme();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Deseas volver a la pantalla de Login?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: () => {
          // @ts-ignore
          navigation.replace('Auth', undefined);
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}
      contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.colors.neutral[900] }]}>
          Perfil de Usuario
        </Text>
      </View>

      {/* Tarjeta de usuario */}
      <Card variant="outlined" style={styles.userCard}>
        <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.neutral[200] }]}>
          <Ionicons name="person-outline" size={32} color={theme.colors.neutral[600]} />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.neutral[900] }]}>
            Usuario Demostración
          </Text>
          <Text style={{ fontSize: 13, color: theme.colors.neutral[500] }}>
            demo@cartasapp.com
          </Text>
          <View style={{ marginTop: 6 }}>
            <Badge size="sm" variant="success">Cuenta Activa</Badge>
          </View>
        </View>
      </Card>

      {/* Navegación y opciones del Stack */}
      <View style={styles.actionsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[800] }]}>
          Navegación y Opciones:
        </Text>

        <Button
          variant="secondary"
          onPress={() => navigation.push('ComponentCatalog')}
          fullWidth
          leftIcon={<Ionicons name="apps-outline" size={18} color="#2E7D32" />}
        >
          Ver Catálogo de Componentes UI
        </Button>

        <View style={styles.spacing} />

        <Button
          variant="outline"
          onPress={() => navigation.push('Settings')}
          fullWidth
          leftIcon={<Ionicons name="settings-outline" size={18} color={theme.colors.neutral[700]} />}
        >
          Ajustes de la Aplicación
        </Button>
      </View>

      <View style={{ marginTop: 24 }}>
        <Button variant="danger" onPress={handleLogout} fullWidth>
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
    gap: 16,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  spacing: {
    height: 10,
  },
});
