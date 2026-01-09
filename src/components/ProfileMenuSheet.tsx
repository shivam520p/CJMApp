import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Pressable,
    Animated,
} from 'react-native';
import MenuItem from './MenuItem';
import ConfirmDialog from './ConfirmDialog';
import { useAuth } from '../context/AuthContext';

type Props = {
    visible: boolean;
    onClose: () => void;
};

export default function ProfileMenuSheet({ visible, onClose }: Props) {
    console.log(visible)
    const slideAnim = useRef(new Animated.Value(300)).current;
    const { logout } = useAuth();
    const [confirmVisible, setConfirmVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            slideAnim.setValue(300);
        }
    }, [visible]);

    return (
        <>
            <Modal visible={visible} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={onClose}>
                    <Animated.View
                        style={[
                            styles.sheet,
                            { transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        <MenuItem icon="User" label="Profile" onPress={onClose} />
                        <MenuItem icon="Settings" label="Settings" onPress={onClose} />
                        <MenuItem
                            icon="LogOut"
                            label="Logout"
                            color="#EF4444"
                            onPress={() => setConfirmVisible(true)}
                        />
                    </Animated.View>
                </Pressable>
            </Modal>

            <ConfirmDialog
                visible={confirmVisible}
                title="Logout"
                message="Are you sure you want to logout?"
                onCancel={() => setConfirmVisible(false)}
                onConfirm={logout}
            />
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#F8FAFC',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 24,
    },
});
