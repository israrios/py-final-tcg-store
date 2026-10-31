import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

type NavProp = NativeStackNavigationProp<ProfileStackParamList, 'Settings'>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}
      contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.screenTitle, { color: theme.colors.neutral[900] }]}>
        Ajustes y Configuración
      </Text>

      {/* Preferencias básicas */}
      <Card variant="outlined" style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.colors.neutral[800] }]}>
          Preferencias de Aplicación
        </Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rowLabel, { color: theme.colors.neutral[900] }]}>
              Notificaciones
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.neutral[500] }}>
              Recibir avisos de nuevas cartas en tiendas
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: theme.colors.primary[500], false: theme.colors.neutral[300] }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rowLabel, { color: theme.colors.neutral[900] }]}>
              Tema Oscuro (En desarrollo)
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.neutral[500] }}>
              Soporte para modo noche
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: theme.colors.primary[500], false: theme.colors.neutral[300] }}
          />
        </View>
      </Card>

      {/* Acceso rápido a catálogo */}
      <Card variant="filled" style={styles.catalogCard}>
        <Ionicons name="color-palette-outline" size={22} color={theme.colors.neutral[700]} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.catalogTitle, { color: theme.colors.neutral[800] }]}>
            Librería de Componentes UI
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.neutral[500], marginBottom: 8 }}>
            Prueba todos los componentes base del sistema de diseño.
          </Text>
          <Button
            size="sm"
            variant="outline"
            onPress={() => navigation.push('ComponentCatalog')}
          >
            Abrir Catálogo
          </Button>
        </View>
      </Card>

      <Text style={[styles.versionText, { color: theme.colors.neutral[400] }]}>
        Cartas App • Versión 0.1.0
      </Text>
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
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  catalogCard: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
    marginBottom: 16,
  },
  catalogTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
