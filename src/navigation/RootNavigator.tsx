import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return null;

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
