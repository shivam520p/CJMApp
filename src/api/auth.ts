import api from './client';

export const signup = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await api.post('/api/v1/auth/register', payload);
    return res.data;
};

export const login = async (payload: {
    email: string;
    password: string;
}) => {
    const res = await api.post('/api/v1/auth/login', payload);
    return res.data;
};

export const logout = async () => {
    const res = await api.post('/api/v1/auth/logout');
    return res.data;
};

export const getMyProfileApi = async () => {
    const res = await api.get('/api/v1/auth/myProfile');
    return res.data;
};
