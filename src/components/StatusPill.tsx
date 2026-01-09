import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';

type Status = 'active' | 'pending' | 'completed';

const STATUS_MAP: Record<
    Status,
    { label: string; bg: string; ring: string; dot: string; text: string }
> = {
    active: {
        label: 'Active',
        bg: '#22C55E1A',
        ring: '#22C55E',
        dot: '#22C55E',
        text: '#22C55E',
    },
    pending: {
        label: 'Pending',
        bg: 'rgba(251, 191, 36, 0.1)',
        ring: '#FBBF24',
        dot: '#FBBF24',
        text: '#FBBF24',
    },
    completed: {
        label: 'Completed',
        bg: '#3B82F61A',
        ring: '#3B82F6',
        dot: '#3B82F6',
        text: '#3B82F6',
    },
};

export default function StatusPill({ status }: { status: Status }) {
    const cfg = STATUS_MAP[status];

    return (
        <View style={[styles.pill, { backgroundColor: cfg.bg }]}>
            <View style={[styles.ring, { borderColor: cfg.ring }]}>
                <View style={[styles.innerDot, { backgroundColor: cfg.dot }]} />
            </View>

            <AppText variant="semibold" style={[styles.text, { color: cfg.text }]}>
                {cfg.label}
            </AppText>
        </View>
    );
}
const styles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 32,
        borderRadius: 999,
    },
    ring: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    innerDot: {
        width: 2,
        height: 2,
        borderRadius: 1,
    },
    text: {
        fontSize: 14,
    },
});
