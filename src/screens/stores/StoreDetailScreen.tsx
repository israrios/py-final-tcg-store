import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StoresStackParamList } from '../../navigation/types';
import { dummyStores, dummyCards } from '../../constants/dummyData';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type Props = NativeStackScreenProps<StoresStackParamList, 'StoreDetail'>;

export const StoreDetailScreen: React.FC<Props> = ({ route }) => {
  const { storeId } = route.params;
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const store = dummyStores.find((s) => s.id === storeId) ?? dummyStores[0];
  const availableCards = dummyCards.filter((c) => store.availableCards.includes(c.id));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: store.name,
    });
  }, [navigation, store.name]);

  const handleContact = () => {
    Alert.alert('Contacto', `Llamar a ${store.phone}`);
  };

  const handleMap = () => {
    Alert.alert('Ubicación', `Dirección: ${store.address}`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}
      contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
      showsVerticalScrollIndicator={false}
    >
      {Boolean(store.logo) && (
        <Image
          source={{ uri: store.logo }}
          style={styles.storeBanner}
          resizeMode="cover"
        />
      )}

      {/* Tarjeta de Información */}
      <Card variant="outlined" style={styles.cardSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[900] }]}>
          Información de la Sucursal
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Dirección:</Text>
          <Text style={[styles.value, { color: theme.colors.neutral[800] }]}>{store.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Teléfono:</Text>
          <Text style={[styles.value, { color: theme.colors.neutral[800] }]}>{store.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Distancia:</Text>
          <Badge variant="info" size="sm">{store.distance.toFixed(1)} km</Badge>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Calificación:</Text>
          <Badge variant="default" size="sm">★ {store.rating}</Badge>
        </View>

        <View style={styles.actionsRow}>
          <View style={{ flex: 1 }}>
            <Button variant="primary" size="sm" onPress={handleContact}>
              Contactar
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button variant="outline" size="sm" onPress={handleMap}>
              Ver en mapa
            </Button>
          </View>
        </View>
      </Card>

      {/* Inventario */}
      <Card variant="filled" style={styles.cardSection}>
        <View style={styles.sectionHeader}>
          <Ionicons name="albums-outline" size={18} color={theme.colors.neutral[700]} />
          <Text style={[styles.sectionTitle, { color: theme.colors.neutral[900], marginBottom: 0 }]}>
            Inventario en tienda
          </Text>
        </View>
        <Text style={[styles.sectionDesc, { color: theme.colors.neutral[600] }]}>
          Cartas registradas actualmente en esta sucursal:
        </Text>

        {availableCards.map((card) => (
          <View key={card.id} style={styles.cardStockRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.stockCardName, { color: theme.colors.neutral[800] }]}>
                {card.name}
              </Text>
              <Text style={{ fontSize: 12, color: theme.colors.neutral[500] }}>
                {card.game.toUpperCase()} • ${card.avgPrice.toFixed(2)} USD
              </Text>
            </View>
            <Button
              size="sm"
              variant="outline"
              onPress={() => {
                navigation.navigate('HomeTab', {
                  screen: 'CardDetail',
                  params: { cardId: card.id },
                });
              }}
            >
              Ficha
            </Button>
          </View>
        ))}
      </Card>
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
  storeBanner: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionDesc: {
    fontSize: 13,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    maxWidth: '65%',
    textAlign: 'right',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cardStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  stockCardName: {
    fontSize: 14,
    fontWeight: '500',
  },
});
