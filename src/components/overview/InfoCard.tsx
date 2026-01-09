import React from 'react';
import { View, StyleSheet } from 'react-native';
import Lucide from '../Lucide';
import AppText from '../AppText';

export default function InfoCard({
    icon,
    iconBg,
    iconColor,
    label,
    value,
}: any) {
    return (
        <View style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
                <Lucide icon={icon} color={iconColor} size={18} />
            </View>

            <AppText style={styles.label}>{label}</AppText>
            <AppText variant="semibold" style={styles.value}>
                {value}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#0F172A',
    },
});
