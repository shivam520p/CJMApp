import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import AppText from '../../components/AppText';
import Lucide from '../../components/Lucide';
import CustomAlert from '../../components/CustomAlert';
import { useAuth } from '../../context/AuthContext';

export default function SignupScreen({ navigation }: any) {
    const { signup } = useAuth();

    const [name, setName] = useState('');
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

    const handleSignup = async () => {
        if (!name.trim()) {
            showAlert('Validation Error', 'Name is required');
            return;
        }

        if (!email.trim()) {
            showAlert('Validation Error', 'Email is required');
            return;
        }

        if (!password.trim()) {
            showAlert('Validation Error', 'Password is required');
            return;
        }

        if (password.length < 8) {
            showAlert(
                'Validation Error',
                'Password must be at least 8 characters'
            );
            return;
        }

        try {
            setLoading(true);
            await signup({ name, email, password });

            setName('');
            setEmail('');
            setPassword('');

            showAlert(
                'Account Created',
                'Signup successful',
                'success'
            );
        } catch (err: any) {
            showAlert(
                'Signup Failed',
                err?.response?.data?.message ||
                err?.message ||
                'Something went wrong'
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
                            Create Account
                        </AppText>
                        <AppText style={styles.subtitle}>
                            Join CJM today
                        </AppText>
                    </View>
                </View>

                <Input
                    placeholder="Full Name"
                    leftIcon="User"
                    value={name}
                    onChangeText={setName}
                    bgColor="#FFFFFF"
                />

                <Input
                    placeholder="Email Address"
                    leftIcon="Mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    bgColor="#FFFFFF"
                />

                <Input
                    placeholder="Password"
                    leftIcon="Lock"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    bgColor="#FFFFFF"
                />

                <PrimaryButton
                    title={loading ? 'Creating...' : 'Create Account'}
                    onPress={handleSignup}
                    disabled={loading}
                />

                <AppText style={styles.footerText}>
                    Already have an account?
                    <AppText
                        style={styles.link}
                        onPress={() => navigation.navigate('Login')}
                    >
                        {' '}Sign In
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
