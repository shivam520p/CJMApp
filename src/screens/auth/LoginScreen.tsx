import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import AppText from '../../components/AppText';
import Lucide from '../../components/Lucide';
import CustomAlert from '../../components/CustomAlert';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        visible: false,
        title: '',
        message: '',
        type: 'error' as 'error' | 'success',
    });

    const showAlert = (
        title: string,
        message: string,
        type: 'error' | 'success' = 'error'
    ) => {
        setAlert({ visible: true, title, message, type });
    };

    const handleLogin = async () => {
        if (!email.trim()) {
            showAlert('Validation Error', 'Email is required');
            return;
        }

        if (!password.trim()) {
            showAlert('Validation Error', 'Password is required');
            return;
        }

        try {
            setLoading(true);
            await login({ email, password });

            setEmail('');
            setPassword('');

            showAlert(
                'Login Successful',
                'You are now logged in',
                'success'
            );
        } catch (err: any) {
            showAlert(
                'Login Failed',
                err?.response?.data?.message ||
                err?.message ||
                'Invalid credentials'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.hdgCmn}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Lucide icon="ArrowLeft" />
                    </TouchableOpacity>

                    <View style={styles.hdgBox}>
                        <AppText variant="bold" style={styles.title}>
                            Welcome Back
                        </AppText>
                        <AppText style={styles.subtitle}>
                            Sign in to continue
                        </AppText>
                    </View>
                </View>

                <Input
                    placeholder="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon="Mail"
                    bgColor="#FFFFFF"
                    value={email}
                    onChangeText={setEmail}
                />

                <Input
                    placeholder="Password"
                    leftIcon="Lock"
                    secureTextEntry
                    bgColor="#FFFFFF"
                    value={password}
                    onChangeText={setPassword}
                />

                <PrimaryButton
                    title={loading ? 'Signing In...' : 'Sign In'}
                    onPress={handleLogin}
                    disabled={loading}
                />

                <AppText style={styles.footerText}>
                    Don’t have an account?
                    <AppText
                        style={styles.link}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        {' '}Create Account
                    </AppText>
                </AppText>
            </View>

            <CustomAlert
                visible={alert.visible}
                title={alert.title}
                message={alert.message}
                type={alert.type}
                onClose={() =>
                    setAlert(prev => ({ ...prev, visible: false }))
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 56,
    },
    hdgCmn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    hdgBox: {
        marginLeft: 12,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 32,
        color: '#6B7280',
    },
    link: {
        color: '#2563EB',
    },
});
