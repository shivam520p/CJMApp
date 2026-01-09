import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Lucide from './Lucide';
import AppText from './AppText';

export default function BackOnlineBanner() {
    const [isConnected, setIsConnected] = useState(true);
    const [showOnlineBanner, setShowOnlineBanner] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                setIsConnected(false);
                setShowOnlineBanner(false);
            } else {
                if (!isConnected) {
                    setShowOnlineBanner(true);
                    setTimeout(() => setShowOnlineBanner(false), 3000);
                }
                setIsConnected(true);
            }
        });

        return unsubscribe;
    }, [isConnected]);

    if (!isConnected) {
        return (
            <View style={[styles.container, styles.offlineBg]}>
                <View style={styles.iconWrapOffline}>
                    <Lucide icon="WifiOff" color="#EF4444" size={22} />
                </View>

                <View style={styles.textBox}>
                    <AppText variant="semibold" style={styles.title}>
                        You’re Offline
                    </AppText>
                    <AppText style={styles.sub}>
                        Changes will sync automatically
                    </AppText>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconWrapOnline}>
                <Lucide icon="Wifi" color="#22C55E" size={22} />
            </View>

            <View style={styles.textBox}>
                <AppText variant="semibold" style={styles.title}>
                    Back Online
                </AppText>
                <AppText style={styles.sub}>
                    All changes synced
                </AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 6,
        marginTop: 12,
    },
    offlineBg: {
        backgroundColor: '#FEF2F2',
    },
    iconWrapOnline: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#DCFCE7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconWrapOffline: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textBox: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#0F172A',
    },
    sub: {
        marginTop: 2,
        fontSize: 14,
        color: '#64748B',
    },
});
