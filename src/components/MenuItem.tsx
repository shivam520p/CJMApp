import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import Lucide from './Lucide';

type Props = {
    icon: string;
    label: string;
    color?: string;
    onPress: () => void;
};

export default function MenuItem({
    icon,
    label,
    color = '#0F172A',
    onPress,
}: Props) {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.left}>
                <Lucide icon={icon as any} size={20} color={color} />
                <AppText style={[styles.label, { color }]}>{label}</AppText>
            </View>
            <Lucide icon="ChevronRight" size={18} color="#94A3B8" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    label: {
        fontSize: 16,
    },
});
