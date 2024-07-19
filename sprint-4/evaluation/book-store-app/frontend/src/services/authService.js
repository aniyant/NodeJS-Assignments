import api from '../api';

const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

const register = async (name, email, password,role='customer') => {
    const response = await api.post('/auth/register', { name, email, password,role });
    return response.data;
};

export default { login, register };
