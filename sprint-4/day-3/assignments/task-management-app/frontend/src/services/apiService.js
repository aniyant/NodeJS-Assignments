import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createTask = (taskData, token) => {
    return api.post('/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Other API calls...
