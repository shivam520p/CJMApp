import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    status: 'Active' | 'Pending' | 'Completed';
};

export default function StatusBadge({ status }: Props) {
    const bg =
        status === 'Active'
            ? '#DCFCE7'
            : status === 'Pending'
                ? '#FEF3C7'
                : '#E0E7FF';

    const color =
        status === 'Active'
            ? '#16A34A'
            : status === 'Pending'
                ? '#D97706'
                : '#2563EB';

    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.text, { color }]}>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        marginTop: 8,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});
