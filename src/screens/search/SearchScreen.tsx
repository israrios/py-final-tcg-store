import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SearchStackParamList } from '../../navigation/types';
import { dummyCards } from '../../constants/dummyData';
import { useTheme } from '../../hooks/useTheme';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

type NavProp = NativeStackNavigationProp<SearchStackParamList, 'Search'>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('Todos');

  const games = ['Todos', 'Pokémon', 'Yu-Gi-Oh!', 'Magic'];

  const results = dummyCards.filter((c) => {
    const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase());
    const matchGame =
      selectedGame === 'Todos' ||
      c.game.toLowerCase().includes(selectedGame.toLowerCase());
    return matchQuery && matchGame;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.neutral[900] }]}>
              Búsqueda de Cartas
            </Text>

            {/* Input de búsqueda */}
            <Input
              placeholder="Buscar por carta o expansión..."
              value={query}
              onChangeText={setQuery}
              leftIcon={<Ionicons name="search-outline" size={18} color={theme.colors.neutral[500]} />}
            />

            {/* Filtros rápidos */}
            <View style={styles.filterRow}>
              {games.map((g) => (
                <TouchableOpacity key={g} onPress={() => setSelectedGame(g)}>
                  <Badge
                    variant={selectedGame === g ? 'success' : 'default'}
                    size="sm"
                  >
                    {g}
                  </Badge>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.resultsInfo}>
              <Text style={{ fontSize: 13, color: theme.colors.neutral[600] }}>
                Mostrando {results.length} coincidencias
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Card variant="outlined" style={styles.resultItem}>
            {Boolean(item.image) && (
              <Image
                source={{ uri: item.image }}
                style={styles.cardThumb}
                resizeMode="cover"
              />
            )}
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: theme.colors.neutral[900] }]}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: theme.colors.neutral[500] }}>
                {item.game.toUpperCase()} • {item.rarity}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: theme.colors.primary[500], marginTop: 2 }}>
                ${item.avgPrice.toFixed(2)} USD
              </Text>
            </View>
            <Button
              size="sm"
              variant="outline"
              onPress={() => navigation.push('CardDetail', { cardId: item.id })}
            >
              Detalle
            </Button>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: theme.colors.neutral[500] }}>
              No se encontraron coincidencias para la búsqueda.
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  resultsInfo: {
    marginBottom: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    gap: 12,
  },
  cardThumb: {
    width: 44,
    height: 52,
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
});
