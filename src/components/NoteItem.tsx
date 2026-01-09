import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    note: string;
    time: string;
    status?: 'synced' | 'pending' | 'failed';
};

export default function NoteItem({ note, time, status = 'synced' }: Props) {
    const statusColor =
        status === 'synced'
            ? '#16A34A'
            : status === 'pending'
                ? '#D97706'
                : '#DC2626';

    return (
        <View style={styles.container}>
            <View style={[styles.indicator, { backgroundColor: statusColor }]} />
            <View style={styles.content}>
                <Text style={styles.note}>{note}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginTop: 12,
    },
    indicator: {
        width: 4,
        borderRadius: 4,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    note: {
        color: '#111827',
        fontSize: 14,
    },
    time: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
});
