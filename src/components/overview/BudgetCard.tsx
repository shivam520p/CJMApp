import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../AppText';
import Lucide from '../Lucide';
import StatusPill from '../StatusPill';

export default function BudgetCard({ status, budget }: any) {
    return (
        <View style={styles.shadowWrapper}>
            <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.card}
            >
                <View style={styles.content}>
                    <View style={styles.status}>
                        <StatusPill
                            status={(status || 'pending').toLowerCase()}
                        />
                    </View>

                    <View style={styles.amountRow}>
                        <Lucide
                            icon="DollarSign"
                            size={20}
                            color="rgba(255,255,255,0.9)"
                        />
                        <View style={styles.cntBox}>
                            <AppText style={styles.label}>
                                Total Budget
                            </AppText>
                            <AppText variant="semibold" style={styles.amount}>
                                {budget}
                            </AppText>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
const styles = StyleSheet.create({
    shadowWrapper: {
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
    },

    card: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    content: {
        padding: 22,
    },

    status: {
        alignSelf: 'flex-start',
        marginBottom: 22,
    },

    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cntBox: {
        marginLeft: 10,
    },

    label: {
        fontSize: 14,
        color: '#E0E7FF',
    },

    amount: {
        fontSize: 24,
        color: '#FFFFFF',
    },
});
