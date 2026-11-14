import React, { useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactoSchema,
  contactoVacio,
  ContactoFormValues,
  TIPOS_MENSAJE,
} from '../../schemas/contactoSchema';
import { useSesion } from '../../context/SesionContext';
import { FormField } from '../../components/FormField';
import { InputRef } from '../../components/ui/Input/Input';
import { ChipSelectField } from '../../components/ChipSelectField';
import { StarRating } from '../../components/StarRating';
import { Button } from '../../components/ui/Button/Button';
import { useTheme } from '../../hooks/useTheme';

const TIPO_LABELS: Record<string, string> = {
  sugerencia: 'Sugerencia',
  error: 'Reportar error',
  consulta: 'Consulta',
};

export const ContactoScreen: React.FC = () => {
  const { usuario } = useSesion();
  const theme = useTheme();

  const correoRef = useRef<InputRef>(null);
  const celularRef = useRef<InputRef>(null);
  const mensajeRef = useRef<InputRef>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      ...contactoVacio,
      nombre: usuario?.nombre ?? '',
      correo: usuario?.correo ?? '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (datos: ContactoFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('[ContactoScreen] Feedback enviado:', datos);
    Alert.alert(
      '¡Gracias!',
      `Recibimos tu ${datos.tipo}. Te responderemos a ${datos.correo}.`
    );
    reset({
      ...contactoVacio,
      nombre: usuario?.nombre ?? '',
      correo: usuario?.correo ?? '',
    });
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
          name="nombre"
          label="Nombre completo"
          placeholder="Tu nombre"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => correoRef.current?.focus()}
        />

        <FormField
          ref={correoRef}
          control={control}
          name="correo"
          label="Correo electrónico"
          placeholder="tu@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => celularRef.current?.focus()}
        />

        <FormField
          ref={celularRef}
          control={control}
          name="celular"
          label="Celular"
          placeholder="987654321"
          keyboardType="number-pad"
          maxLength={9}
          returnKeyType="next"
          onSubmitEditing={() => mensajeRef.current?.focus()}
        />

        <ChipSelectField
          control={control}
          name="tipo"
          label="Tipo de mensaje"
          opciones={TIPOS_MENSAJE}
          formatLabel={(op) => TIPO_LABELS[op] ?? op}
        />

        <Controller
          control={control}
          name="calificacion"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={{ gap: theme.spacing[1] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.sm,
                  fontWeight: theme.typography.fontWeights.medium,
                  color: theme.colors.neutral[700],
                }}
              >
                ¿Cómo calificas la app?
              </Text>
              <StarRating value={value} onChange={onChange} />
              {error ? (
                <Text
                  accessibilityRole="alert"
                  style={{
                    fontSize: theme.typography.fontSizes.xs,
                    color: theme.colors.semantic.error,
                  }}
                >
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <FormField
          ref={mensajeRef}
          control={control}
          name="mensaje"
          label="Mensaje"
          placeholder="Cuéntanos tu sugerencia, consulta o problema..."
          multiline
          numberOfLines={5}
          maxLength={500}
          inputStyle={{ minHeight: 100, textAlignVertical: 'top' }}
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={() => handleSubmit(onSubmit)()}
        />

        <Controller
          control={control}
          name="aceptaTerminos"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={{ gap: theme.spacing[1] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing[3] }}>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{
                    false: theme.colors.neutral[300],
                    true: theme.colors.primary[500],
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: theme.typography.fontSizes.sm,
                    color: theme.colors.neutral[700],
                  }}
                >
                  Acepto que usen mis datos para responderme
                </Text>
              </View>
              {error ? (
                <Text
                  accessibilityRole="alert"
                  style={{
                    fontSize: theme.typography.fontSizes.xs,
                    color: theme.colors.semantic.error,
                  }}
                >
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <View style={{ marginTop: theme.spacing[2] }}>
          <Button
            onPress={() => handleSubmit(onSubmit)()}
            disabled={isSubmitting}
            loading={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
