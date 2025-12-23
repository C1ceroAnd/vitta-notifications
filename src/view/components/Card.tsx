import React, { ReactNode } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing, borderRadius, fonts, fontSizes } from "@/view/themes/theme";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'surface' | 'white';
}

export const Card = ({ title, subtitle, children, style, variant = 'white' }: CardProps) => {
  return (
    <View style={[
      styles.card, 
      { backgroundColor: variant === 'surface' ? colors.surface : colors.white },
      style
    ]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    shadowColor: "#0F1D1A",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  content: {
    gap: spacing.md,
  }
});