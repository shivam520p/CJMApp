import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://sandbox-job-app.bosselt.com',
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    async error => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;
