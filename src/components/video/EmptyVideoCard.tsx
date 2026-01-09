import React from 'react';
import { View, StyleSheet } from 'react-native';
import Lucide from '../Lucide';
import AppText from '../AppText';

export default function EmptyVideoCard() {
    return (
        <View style={styles.card}>
            <Lucide icon="Video" size={48} color="#64748B" />

            <AppText style={styles.text}>
                No videos uploaded yet
            </AppText>
        </View>
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
    text: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 12,
    },
});
