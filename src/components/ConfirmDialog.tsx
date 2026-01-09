import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AppText from './AppText';

type Props = {
    visible: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmDialog({
    visible,
    title,
    message,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <AppText variant="semibold" style={styles.title}>
                        {title}
                    </AppText>
                    <AppText style={styles.message}>
                        {message}
                    </AppText>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                            <AppText style={styles.cancelText}>Cancel</AppText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirm} onPress={onConfirm}>
                            <AppText style={styles.confirmText}>Logout</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        width: '80%',
    },
    title: {
        fontSize: 18,
        color: '#0F172A',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancel: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    confirm: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#EF4444',
        borderRadius: 10,
    },
    cancelText: {
        color: '#2563EB',
    },
    confirmText: {
        color: '#FFFFFF',
    },
});
