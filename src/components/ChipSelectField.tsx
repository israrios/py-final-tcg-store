import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTheme } from '../hooks/useTheme';

interface ChipSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  opciones: readonly string[];
  formatLabel?: (option: string) => string;
}

export function ChipSelectField<T extends FieldValues>({
  control,
  name,
  label,
  opciones,
  formatLabel,
}: ChipSelectFieldProps<T>) {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={{ gap: theme.spacing[2] }}>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.sm,
              fontWeight: theme.typography.fontWeights.medium,
              color: theme.colors.neutral[700],
            }}
          >
            {label}
          </Text>
          <View style={styles.row}>
            {opciones.map((op) => {
              const selected = value === op;
              return (
                <TouchableOpacity
                  key={op}
                  onPress={() => onChange(op)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected
                        ? theme.colors.primary[500]
                        : theme.colors.neutral[100],
                      borderColor: selected
                        ? theme.colors.primary[500]
                        : error
                        ? theme.colors.semantic.error
                        : theme.colors.neutral[300],
                      borderRadius: theme.borderRadius.full,
                      paddingHorizontal: theme.spacing[3],
                      paddingVertical: theme.spacing[2],
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.xs,
                      fontWeight: theme.typography.fontWeights.medium,
                      color: selected
                        ? theme.colors.neutral[0]
                        : theme.colors.neutral[700],
                    }}
                  >
                    {formatLabel ? formatLabel(op) : op}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
  },
});
