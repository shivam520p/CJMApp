import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography } from '../theme/typography';

type Props = TextProps & {
    variant?: 'regular' | 'medium' | 'semibold' | 'bold';
};

export default function AppText({
    variant = 'regular',
    style,
    ...props
}: Props) {
    return (
        <Text
            {...props}
            style={[
                styles.base,
                { fontFamily: typography[variant] },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    base: {
        color: '#111827',
        fontSize: 14,
        letterSpacing: 0
    },
});
