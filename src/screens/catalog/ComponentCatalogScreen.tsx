import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Divider } from '../../components/ui/Divider';
import { Loader } from '../../components/ui/Loader';

export const ComponentCatalogScreen: React.FC = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.semantic.background }]}
      contentContainerStyle={[styles.content, { padding: theme.spacing[4] }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.screenTitle, { color: theme.colors.neutral[900] }]}>
        Catálogo de Componentes
      </Text>
      <Text style={[styles.screenSubtitle, { color: theme.colors.neutral[600] }]}>
        Sistema de diseño y componentes base reutilizables
      </Text>

      {/* 1. BOTONES */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[800] }]}>
          1. Botones (Button)
        </Text>
        <View style={styles.row}>
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
        </View>
        <View style={styles.spacing} />
        <Button variant="outline" size="md" fullWidth>
          Outline Full Width
        </Button>
        <View style={styles.spacing} />
        <View style={styles.row}>
          <Button variant="danger" size="md">Danger</Button>
          <Button variant="ghost" size="md">Ghost</Button>
          <Button
            variant="primary"
            size="md"
            loading={loadingBtn}
            onPress={() => {
              setLoadingBtn(true);
              setTimeout(() => setLoadingBtn(false), 1500);
            }}
          >
            Loading Test
          </Button>
        </View>
      </View>

      <View style={styles.dividerWrapper}><Divider /></View>

      {/* 2. CAMPOS DE TEXTO */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[800] }]}>
          2. Inputs (Input)
        </Text>
        <Input
          label="Campo de texto básico"
          placeholder="Escribe algo..."
          value={inputValue}
          onChangeText={setInputValue}
          helperText="Texto de ayuda o instrucción"
        />
        <View style={styles.spacing} />
        <Input
          label="Campo tipo contraseña"
          placeholder="••••••••"
          variant="password"
          helperText="Incluye alternador de visibilidad"
        />
        <View style={styles.spacing} />
        <Input
          label="Campo con error"
          placeholder="Invalido"
          errorMessage="Este campo contiene un error"
        />
      </View>

      <View style={styles.dividerWrapper}><Divider /></View>

      {/* 3. TARJETAS */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[800] }]}>
          3. Tarjetas (Card)
        </Text>
        <Card variant="outlined" style={styles.cardDemo}>
          <Text style={{ fontWeight: '600', color: theme.colors.neutral[800] }}>
            Card Outlined
          </Text>
          <Text style={{ color: theme.colors.neutral[600], marginTop: 4 }}>
            Tarjeta con borde neutro, ideal para maquetas y wireframes.
          </Text>
        </Card>
        <View style={styles.spacing} />
        <Card variant="filled" style={styles.cardDemo}>
          <Text style={{ fontWeight: '600', color: theme.colors.neutral[800] }}>
            Card Filled
          </Text>
          <Text style={{ color: theme.colors.neutral[600], marginTop: 4 }}>
            Tarjeta con fondo sólido para destacar bloques de contenido.
          </Text>
        </Card>
        <View style={styles.spacing} />
        <Card variant="elevated" style={styles.cardDemo}>
          <Text style={{ fontWeight: '600', color: theme.colors.neutral[800] }}>
            Card Elevated
          </Text>
          <Text style={{ color: theme.colors.neutral[600], marginTop: 4 }}>
            Tarjeta con sombra sutil para jerarquía de elevación.
          </Text>
        </Card>
      </View>

      <View style={styles.dividerWrapper}><Divider /></View>

      {/* 4. INSIGNIAS / BADGES */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[800] }]}>
          4. Insignias (Badge)
        </Text>
        <View style={styles.badgeRow}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </View>
        <View style={styles.spacing} />
        <View style={styles.badgeRow}>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </View>
      </View>

      <View style={styles.dividerWrapper}><Divider /></View>

      {/* 5. LOADERS Y DIVISORES */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral[800] }]}>
          5. Utilidades (Loader & Divider)
        </Text>
        <View style={styles.row}>
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
          <Loader variant="skeleton" />
        </View>
      </View>

      <View style={{ height: 40 }} />
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  spacing: {
    height: 10,
  },
  cardDemo: {
    marginVertical: 2,
  },
  dividerWrapper: {
    marginVertical: 16,
  },
});
