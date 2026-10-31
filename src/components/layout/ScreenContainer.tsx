import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  style?: object;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  padded = true,
  style,
}) => {
  const theme = useTheme();

  const innerStyle = [
    styles.inner,
    padded && { padding: theme.spacing[4] },
    style,
  ];

  if (scrollable) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: theme.colors.semantic.background }]}
        edges={['bottom']}
      >
        <ScrollView
          contentContainerStyle={innerStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.colors.semantic.background }]}
      edges={['bottom']}
    >
      <View style={innerStyle}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  inner: { flex: 1 },
});
