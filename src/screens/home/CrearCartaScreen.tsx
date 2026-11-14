import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { agregarCarta } from '../../store/cardsSlice';
import {
  cartaSchema,
  cartaVacia,
  CartaFormValues,
  JUEGOS,
  RAREZAS,
  CONDICIONES,
} from '../../schemas/cartaSchema';
import { FormField } from '../../components/FormField';
import { InputRef } from '../../components/ui/Input/Input';
import { ChipSelectField } from '../../components/ChipSelectField';
import { Button } from '../../components/ui/Button/Button';
import { useTheme } from '../../hooks/useTheme';

const GAME_LABELS: Record<string, string> = {
  pokemon: 'Pokémon',
  yugioh: 'Yu-Gi-Oh!',
  magic: 'Magic',
};

export const CrearCartaScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();

  const setNameRef = useRef<InputRef>(null);
  const avgPriceRef = useRef<InputRef>(null);
  const descriptionRef = useRef<InputRef>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CartaFormValues>({
    resolver: zodResolver(cartaSchema),
    defaultValues: cartaVacia,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (datos: CartaFormValues) => {
    dispatch(
      agregarCarta({
        name: datos.name,
        setName: datos.setName,
        game: datos.game,
        rarity: datos.rarity,
        condition: datos.condition,
        avgPrice: Number(datos.avgPrice),
        description: datos.description,
      })
    );
    reset();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.semantic.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing[4],
          gap: theme.spacing[4],
          paddingBottom: theme.spacing[8],
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormField
          control={control}
          name="name"
          label="Nombre de la carta"
          placeholder="Ej. Charizard VMAX"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => setNameRef.current?.focus()}
        />

        <FormField
          ref={setNameRef}
          control={control}
          name="setName"
          label="Expansión / Colección"
          placeholder="Ej. Champion's Path"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => avgPriceRef.current?.focus()}
        />

        <FormField
          ref={avgPriceRef}
          control={control}
          name="avgPrice"
          label="Precio estimado (USD)"
          placeholder="Ej. 45.50"
          keyboardType="decimal-pad"
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />

        <ChipSelectField
          control={control}
          name="game"
          label="Juego"
          opciones={JUEGOS}
          formatLabel={(op) => GAME_LABELS[op] ?? op}
        />

        <ChipSelectField
          control={control}
          name="rarity"
          label="Rareza"
          opciones={RAREZAS}
        />

        <ChipSelectField
          control={control}
          name="condition"
          label="Estado"
          opciones={CONDICIONES}
        />

        <FormField
          ref={descriptionRef}
          control={control}
          name="description"
          label="Descripción"
          placeholder="Detalles del estado, edición o idioma..."
          multiline
          numberOfLines={4}
          inputStyle={{ minHeight: 90, textAlignVertical: 'top' }}
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={() => handleSubmit(onSubmit)()}
        />

        <View style={{ marginTop: theme.spacing[2] }}>
          <Button
            onPress={() => handleSubmit(onSubmit)()}
            disabled={isSubmitting}
            loading={isSubmitting}
            fullWidth
          >
            Guardar Carta
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
