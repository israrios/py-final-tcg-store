import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StoresStackParamList } from '../../navigation/types';
import { dummyStores } from '../../constants/dummyData';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

type NavProp = NativeStackNavigationProp<StoresStackParamList, 'StoresList'>;

export const StoresListScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const theme = useTheme();
  const [search, setSearch] = useState('');

  const stores = dummyStores.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleStorePress = (storeId: string) => {
    navigation.push('StoreDetail', { storeId });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.colors.neutral[900] }]}>
                Tiendas de Cartas
              </Text>
            </View>

            <Input
              placeholder="Buscar tienda por nombre o zona..."
              value={search}
              onChangeText={setSearch}
              leftIcon={<Ionicons name="storefront-outline" size={18} color={theme.colors.neutral[500]} />}
            />

            <Text style={[styles.sectionTitle, { color: theme.colors.neutral[700], marginTop: 12 }]}>
              Tiendas disponibles
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card variant="outlined" style={styles.storeCard}>
            {Boolean(item.logo) && (
              <Image
                source={{ uri: item.logo }}
                style={styles.storeLogo}
                resizeMode="cover"
              />
            )}
            <View style={styles.storeInfo}>
              <Text style={[styles.storeName, { color: theme.colors.neutral[900] }]}>
                {item.name}
              </Text>
              <Text style={[styles.storeAddress, { color: theme.colors.neutral[600] }]} numberOfLines={1}>
                {item.address}
              </Text>
              <View style={styles.metaRow}>
                <Badge size="sm" variant="info">
                  {item.distance < 1
                    ? `${Math.round(item.distance * 1000)}m`
                    : `${item.distance.toFixed(1)} km`}
                </Badge>
                <Badge size="sm" variant="default">
                  Calificación: {item.rating}
                </Badge>
              </View>
            </View>
            <Button
              size="sm"
              variant="outline"
              onPress={() => handleStorePress(item.id)}
            >
              Ver Tienda
            </Button>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: theme.colors.neutral[500] }}>
              No se encontraron tiendas.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  storeLogo: {
    width: 52,
    height: 52,
    borderRadius: 6,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '600',
  },
  storeAddress: {
    fontSize: 12,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
});
