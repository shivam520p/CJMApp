import React from 'react';
import { View, StyleSheet } from 'react-native';
import Lucide from '../Lucide';
import AppText from '../AppText';

export default function SectionCard({ icon, title, content }: any) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                {icon ? <Lucide icon={icon} size={18} color='#3B82F6'/> : null}
                <AppText variant="semibold" style={styles.title}>
                    {title}
                </AppText>
            </View>

            <AppText style={styles.content}>{content}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        color: '#0F172A',
    },
    content: {
        fontSize: 15,
        color: '#64748B',
        lineHeight: 22,
    },
});
