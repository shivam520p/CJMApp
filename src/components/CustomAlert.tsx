import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import AppText from './AppText';
import Lucide from './Lucide';

type Props = {
    visible: boolean;
    title?: string;
    message?: string;
    type?: 'error' | 'success';
    onClose: () => void;
};

export default function CustomAlert({
    visible,
    title = '',
    message = '',
    type = 'error',
    onClose,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay}>
                <View style={styles.card}>
                    <View
                        style={[
                            styles.iconWrap,
                            type === 'error'
                                ? styles.errorBg
                                : styles.successBg,
                        ]}
                    >
                        <Lucide
                            icon={type === 'error' ? 'XCircle' : 'CheckCircle'}
                            size={28}
                            color={type === 'error' ? '#EF4444' : '#22C55E'}
                        />
                    </View>

                    {!!title && (
                        <AppText variant="semibold" style={styles.title}>
                            {title}
                        </AppText>
                    )}

                    {!!message && (
                        <AppText style={styles.message}>
                            {message}
                        </AppText>
                    )}

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.button}
                        onPress={onClose}
                    >
                        <AppText style={styles.buttonText}>
                            OK
                        </AppText>
                    </TouchableOpacity>
                </View>
            </Pressable>
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
        alignItems: 'center',
    },
    iconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    errorBg: {
        backgroundColor: '#FEE2E2',
    },
    successBg: {
        backgroundColor: '#DCFCE7',
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
        color: '#0F172A',
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 28,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});
