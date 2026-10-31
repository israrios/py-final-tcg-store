import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../../navigation/types';
import { dummyCards, dummyStores } from '../../constants/dummyData';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

type Props = NativeStackScreenProps<HomeStackParamList, 'CardDetail'>;

export const CardDetailScreen: React.FC<Props> = ({ route }) => {
  const { cardId } = route.params;
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const card = dummyCards.find((c) => c.id === cardId) ?? dummyCards[0];
  const availableStores = dummyStores.filter((s) => s.availableCards.includes(card.id));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: card.name,
    });
  }, [navigation, card.name]);

  const handleGoToStore = (storeId: string) => {
    navigation.navigate('StoresTab', {
      screen: 'StoreDetail',
      params: { storeId },
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}
      contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
      showsVerticalScrollIndicator={false}
    >
      {Boolean(card.image) && (
        <Image
          source={{ uri: card.image }}
          style={styles.cardDetailImage}
          resizeMode="contain"
        />
      )}

      {/* Tarjeta de Especificaciones */}
      <Card variant="outlined" style={styles.cardSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[900] }]}>
          Datos de la Carta
        </Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Juego:</Text>
          <Badge variant="default" size="sm">{card.game.toUpperCase()}</Badge>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Rareza:</Text>
          <Badge variant="info" size="sm">{card.rarity}</Badge>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Colección / Set:</Text>
          <Text style={[styles.value, { color: theme.colors.neutral[800] }]}>{card.setName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.neutral[600] }]}>Precio estimado:</Text>
          <Text style={[styles.priceHighlight, { color: theme.colors.primary[500] }]}>
            ${card.avgPrice.toFixed(2)} USD
          </Text>
        </View>
      </Card>

      {/* Tiendas disponibles */}
      <Card variant="filled" style={styles.cardSection}>
        <View style={styles.sectionHeader}>
          <Ionicons name="storefront-outline" size={18} color={theme.colors.neutral[700]} />
          <Text style={[styles.sectionTitle, { color: theme.colors.neutral[900], marginBottom: 0 }]}>
            Disponibilidad en tiendas
          </Text>
        </View>
        <Text style={[styles.sectionDesc, { color: theme.colors.neutral[600] }]}>
          Tiendas con existencias:
        </Text>

        {availableStores.length > 0 ? (
          availableStores.map((st) => (
            <View key={st.id} style={styles.storeItemRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.storeName, { color: theme.colors.neutral[800] }]}>
                  {st.name}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.neutral[500] }}>
                  {st.address} • {st.distance.toFixed(1)} km
                </Text>
              </View>
              <Button
                size="sm"
                variant="outline"
                onPress={() => handleGoToStore(st.id)}
              >
                Ver Tienda
              </Button>
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 13, color: theme.colors.neutral[500], fontStyle: 'italic' }}>
            No hay tiendas disponibles actualmente.
          </Text>
        )}
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
  cardDetailImage: {
    width: '100%',
    height: 260,
    marginBottom: 16,
    borderRadius: 8,
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
  row: {
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
  },
  priceHighlight: {
    fontSize: 16,
    fontWeight: '700',
  },
  storeItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
  },
});
