import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../../navigation/types';
import { dummyCards } from '../../constants/dummyData';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Pokémon', 'Yu-Gi-Oh!', 'Magic'];

  const filteredCards = dummyCards.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === 'Todas' ||
      c.game.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchSearch && matchCat;
  });

  const handleCardPress = (cardId: string) => {
    navigation.push('CardDetail', { cardId });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}>
      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { padding: theme.spacing[4] }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            {/* Estado de construcción */}
            <View style={styles.statusBar}>
              <Text style={[styles.title, { color: theme.colors.neutral[900] }]}>
                Cartas Disponibles
              </Text>
              <Badge variant="default" size="sm">
                Prototipo v0.1
              </Badge>
            </View>

            {/* Buscador */}
            <Input
              placeholder="Buscar cartas..."
              value={search}
              onChangeText={setSearch}
              leftIcon={<Ionicons name="search-outline" size={18} color={theme.colors.neutral[500]} />}
            />

            {/* Categorías básicas */}
            <View style={styles.categoriesRow}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Badge
                    variant={selectedCategory === cat ? 'success' : 'default'}
                    size="sm"
                  >
                    {cat}
                  </Badge>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionSubtitle, { color: theme.colors.neutral[700] }]}>
              Cartas disponibles
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card variant="outlined" style={styles.cardItem}>
            {Boolean(item.image) && (
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            )}

            {/* Información básica */}
            <View style={styles.cardInfo}>
              <Text style={[styles.cardTitle, { color: theme.colors.neutral[900] }]} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.metaRow}>
                <Badge size="sm" variant="default">
                  {item.game.toUpperCase()}
                </Badge>
                <Badge size="sm" variant="info">
                  {item.rarity}
                </Badge>
              </View>
              <Text style={[styles.priceText, { color: theme.colors.neutral[700] }]}>
                Ref: ${item.avgPrice.toFixed(2)} USD
              </Text>

              {/* Botón de acción para probar navegación a CardDetail */}
              <View style={styles.buttonWrapper}>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => handleCardPress(item.id)}
                >
                  Ver detalle
                </Button>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: theme.colors.neutral[500] }}>
              No se encontraron cartas.
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
  listContent: {
    paddingBottom: 32,
  },
  headerArea: {
    marginBottom: 12,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardItem: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
  },
  cardImage: {
    width: 80,
    height: 96,
    borderRadius: 6,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  priceText: {
    fontSize: 13,
    marginBottom: 8,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
});
