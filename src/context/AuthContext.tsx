import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    signup as signupApi,
    login as loginApi,
    logout as logoutApi,
    getMyProfileApi,
} from '../api/auth';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const storedToken = await AsyncStorage.getItem('token');

            if (storedToken) {
                setToken(storedToken);
                setIsLoggedIn(true);

                try {
                    const res = await getMyProfileApi();
                    setProfile(res.data);
                } catch { }
            }

            setLoading(false);
        };

        init();
    }, []);

    const signup = async (data: any) => {
        const res = await signupApi(data);
        return res;
    };

    const login = async (data: any) => {
        const res = await loginApi(data);
        const authToken = res.data.token;

        await AsyncStorage.setItem('token', authToken);
        setToken(authToken);
        setIsLoggedIn(true);

        const profileRes = await getMyProfileApi();
        setProfile(profileRes.data);

        return res;
    };

    const logout = async () => {
        await logoutApi();
        await AsyncStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        setProfile(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isLoggedIn,
                loading,
                profile,
                signup,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
