import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BagIcon from '../../assets/icons/BagIcon';
import StarBadgeIcon from '../../assets/icons/StarBadgeIcon';
import PrimaryButton from '../../components/PrimaryButton';
import AppText from '../../components/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={['#0F172A', '#1E293B', '#0F172A']}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />

                <ImageBackground
                    source={require('../../assets/vector/welcome-bg.png')}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                />
            </View>

            <View style={styles.logoContainer}>
                <View style={styles.logoWrapper}>
                    <View style={styles.starBadgeIcon}>
                        <StarBadgeIcon size={46} />
                    </View>

                    <LinearGradient
                        colors={['#3B82F6', '#22C55E']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.logoBox}
                    >
                        <View style={styles.logoContent}>
                            <BagIcon />
                        </View>
                    </LinearGradient>
                </View>

                <AppText variant="bold" style={styles.logoText}>
                    CJM
                </AppText>

                <AppText style={styles.subtitle}>
                    Contractor Job Management
                </AppText>
            </View>

            <PrimaryButton
                title="Create Account"
                onPress={() => navigation.navigate('Signup')}
            />

            <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate('Login')}
            >
                <AppText variant="semibold" style={styles.secondaryText}>
                    Sign In
                </AppText>
            </TouchableOpacity>

            <AppText style={styles.footer}>
                By continuing, you agree to CJM’s Terms of Service{'\n'}
                and Privacy Policy
            </AppText>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    logoBox: {
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.44,
        shadowRadius: 24.37,
        elevation: 10,
        zIndex: 2,
    },
    logoContent: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starBadgeIcon: {
        position: 'absolute',
        top: -26,
        right: -26,
        zIndex: 1,
        shadowColor: '#FBBF24',
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 4,
    },
    logoText: {
        fontSize: 36,
        color: '#FFFFFF',
    },
    subtitle: {
        color: '#94A3B8',
        marginTop: 4,
    },
    secondaryBtn: {
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#475569',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginTop: 16,
    },
    secondaryText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    footer: {
        marginTop: 48,
        textAlign: 'center',
        fontSize: 12,
        color: '#64748B',
    },
});
