import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Lucide from './Lucide';
import StatusPill from './StatusPill';
import AppText from './AppText';
import { formatDisplayDate } from '../utils/reusable';

export default function JobCard({ job, onPress }: any) {
    const client =
        job.client ||
        job.location?.split(',')?.[0]?.trim() ||
        'Client';

    const city =
        job.city ||
        job.location?.split(',')?.slice(1).join(',')?.trim() ||
        'Location';

    const date =
        job.date ||
        job.createdAt ||
        new Date().toISOString();

    const status =
        (job.status || 'active').toLowerCase();
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.outer}
        >
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <AppText variant="semibold" style={styles.title}>
                            {job.title}
                        </AppText>
                        <AppText style={styles.client}>
                            {client}
                        </AppText>
                    </View>

                    <StatusPill status={status} />
                </View>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <View style={[styles.iconCircle, styles.blueBg]}>
                            <Lucide
                                icon="DollarSign"
                                color="#3B82F6"
                                size={16}
                            />
                        </View>
                        <AppText variant="semibold" style={styles.metaText}>
                            {job.budget}
                        </AppText>
                    </View>

                    <View style={styles.metaItem}>
                        <View style={[styles.iconCircle, styles.greenBg]}>
                            <Lucide
                                icon="MapPin"
                                color="#22C55E"
                                size={16}
                            />
                        </View>
                        <AppText variant="semibold" style={styles.metaText}>
                            {city}
                        </AppText>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.dateRow}>
                    <Lucide icon="Clock" color="#64748B" size={16} />
                    <AppText style={styles.date}>
                        Started {formatDisplayDate(date)}
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    outer: {
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 21,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        flexShrink: 1,
    },
    title: {
        fontSize: 18,
        color: '#0F172A',
    },
    client: {
        marginTop: 4,
        fontSize: 14,
        color: '#64748B',
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    blueBg: {
        backgroundColor: '#EEF2FF',
    },
    greenBg: {
        backgroundColor: '#ECFDF5',
    },
    metaText: {
        fontSize: 14,
        color: '#0F172A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        marginLeft: 8,
        fontSize: 14,
        color: '#64748B',
    },
});
