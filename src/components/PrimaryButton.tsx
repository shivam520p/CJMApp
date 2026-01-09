import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle;
};

export default function PrimaryButton({
    title,
    onPress,
    disabled = false,
    style,
}: Props) {
    return (
        <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.container, style, disabled && styles.disabled]}
        >
            <TouchableOpacity
                style={styles.content}
                onPress={onPress}
                activeOpacity={0.8}
                disabled={disabled}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 8,
    },
    content: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0
    },
    disabled: {
        opacity: 0.6,
    },
});
