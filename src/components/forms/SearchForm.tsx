import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Input } from '../ui/Input/Input';
import { Button } from '../ui/Button/Button';
import { SearchFilters, CardGame, CardRarity } from '../../types/card';

interface SearchFormProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  initialQuery?: string;
  initialFilters?: SearchFilters;
  placeholder?: string;
  showFilters?: boolean;
}

const GAMES: { label: string; value: CardGame }[] = [
  { label: 'Pokémon', value: 'pokemon' },
  { label: 'Yu-Gi-Oh!', value: 'yugioh' },
  { label: 'Magic', value: 'magic' },
];

const RARITIES: { label: string; value: CardRarity }[] = [
  { label: 'Common', value: 'Common' },
  { label: 'Uncommon', value: 'Uncommon' },
  { label: 'Rare', value: 'Rare' },
  { label: 'Ultra Rare', value: 'Ultra Rare' },
  { label: 'Secret Rare', value: 'Secret Rare' },
  { label: 'Legendary', value: 'Legendary' },
];

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  initialQuery = '',
  initialFilters = {},
  placeholder = 'Buscar carta...',
  showFilters = false,
}) => {
  const theme = useTheme();
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(showFilters);

  const handleSearch = () => {
    console.log('[SearchForm] onSearch', { query, filters });
    onSearch?.(query, filters);
  };

  const toggleGame = (game: CardGame) => {
    setFilters((prev) => ({ ...prev, game: prev.game === game ? undefined : game }));
  };

  const toggleRarity = (rarity: CardRarity) => {
    setFilters((prev) => ({ ...prev, rarity: prev.rarity === rarity ? undefined : rarity }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Input
            variant="search"
            placeholder={placeholder}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity
          onPress={() => setFiltersOpen((v) => !v)}
          style={[
            styles.filterBtn,
            {
              borderColor: filtersOpen ? theme.colors.primary[500] : theme.colors.neutral[300],
              borderRadius: theme.borderRadius.base,
              backgroundColor: filtersOpen ? theme.colors.primary[50] : theme.colors.neutral[0],
            },
          ]}
        >
          <Text style={{ color: filtersOpen ? theme.colors.primary[500] : theme.colors.neutral[600], fontSize: 13 }}>
            Filtros
          </Text>
        </TouchableOpacity>
      </View>

      {filtersOpen && (
        <View style={[styles.filtersPanel, { backgroundColor: theme.colors.neutral[50], borderRadius: theme.borderRadius.md, padding: theme.spacing[3] }]}>
          <Text style={[styles.sectionLabel, { color: theme.colors.neutral[700], fontSize: theme.typography.fontSizes.sm, fontWeight: theme.typography.fontWeights.semiBold }]}>
            Juego
          </Text>
          <View style={styles.chips}>
            {GAMES.map((g) => (
              <TouchableOpacity
                key={g.value}
                onPress={() => toggleGame(g.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: filters.game === g.value ? theme.colors.primary[500] : theme.colors.neutral[200],
                    borderRadius: theme.borderRadius.full,
                  },
                ]}
              >
                <Text style={{ color: filters.game === g.value ? theme.colors.neutral[0] : theme.colors.neutral[700], fontSize: 13 }}>
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: theme.spacing[3] }} />

          <Text style={[styles.sectionLabel, { color: theme.colors.neutral[700], fontSize: theme.typography.fontSizes.sm, fontWeight: theme.typography.fontWeights.semiBold }]}>
            Rareza
          </Text>
          <View style={styles.chips}>
            {RARITIES.map((r) => (
              <TouchableOpacity
                key={r.value}
                onPress={() => toggleRarity(r.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: filters.rarity === r.value ? theme.colors.primary[500] : theme.colors.neutral[200],
                    borderRadius: theme.borderRadius.full,
                  },
                ]}
              >
                <Text style={{ color: filters.rarity === r.value ? theme.colors.neutral[0] : theme.colors.neutral[700], fontSize: 13 }}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: theme.spacing[3] }} />
          <Button size="sm" onPress={handleSearch} fullWidth>Aplicar filtros</Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  filterBtn: { borderWidth: 1.5, paddingHorizontal: 12, paddingVertical: 14, justifyContent: 'center' },
  filtersPanel: {},
  sectionLabel: { marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6 },
});
