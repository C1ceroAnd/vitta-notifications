import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import { colors, fonts, fontSizes, borderRadius } from "@/view/themes/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export const Button = ({
    title,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
    style,
    textStyle,
}: ButtonProps) => {
    const isDisabled = disabled || loading;
    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary': return styles.secondary;
            case 'outline': return styles.outline;
            case 'ghost': return styles.ghost;
            case 'danger': return styles.danger;
            default: return styles.primary;
        }
    };

    const getTextColor = (): TextStyle => {
        switch (variant) {
            case 'secondary': 
            case 'outline':
            case 'ghost':
                return styles.primaryTextInv;
            case 'danger': 
                return styles.whiteText;
            default: 
                return styles.whiteText;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.base, getVariantStyle(), isDisabled && styles.disabled, style]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === "outline" || variant === "ghost" ? colors.primary : colors.white}
                />
            ) : (
                <Text style={[styles.text, getTextColor(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        height: 56,
        borderRadius: borderRadius.full,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
    },
    // View Styles (Containers)
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.primaryLight },
    outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.primary },
    ghost: { backgroundColor: "transparent" },
    danger: { backgroundColor: colors.error },
    
    disabled: { opacity: 0.6 },
    
    // Text Styles
    text: { fontSize: fontSizes.md, fontFamily: fonts.bold },
    whiteText: { color: colors.white },
    primaryTextInv: { color: colors.primary },
});