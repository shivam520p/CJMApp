import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lucide from '../Lucide';
import AppText from '../AppText';
import { formatDisplayDateTime } from '../../utils/reusable';

export default function NoteItem({ text, time, onEdit }: any) {
    return (
        <View style={styles.card}>
            <LinearGradient
                colors={['#3B82F6', 'rgba(0,0,0,0)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.leftBar}
            />

            <View style={styles.content}>
                <AppText style={styles.text}>{text}</AppText>

                <View style={styles.footer}>
                    <View style={styles.timeRow}>
                        <Lucide icon="Clock" size={14} color="#64748B" />
                        <AppText style={styles.time}>
                            {formatDisplayDateTime(time)}
                        </AppText>
                    </View>

                    <TouchableOpacity onPress={onEdit}>
                        <Lucide icon="Pencil" size={16} color="#2563EB" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 24,
        paddingVertical: 16,
        overflow: 'hidden',
        marginBottom: 12,
    },
    leftBar: { width: 4 },
    content: {
        paddingHorizontal: 28,
        paddingVertical: 16,
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#0F172A',
        lineHeight: 24,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    time: {
        fontSize: 12,
        color: '#64748B',
    },
});
