import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Lucide from '../Lucide';
import AppText from '../AppText';

export default function VideoPreviewCard({ video, onPress }: any) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.card}
        >
            <Lucide icon="PlayCircle" size={56} color="#3B82F6" />

            <AppText variant="semibold" style={styles.title}>
                Watch Site Video
            </AppText>

            <AppText style={styles.subtitle}>
                {video.fileName}
            </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingVertical: 40,
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        color: '#0F172A',
        marginTop: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 6,
    },
});
