import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authApi = axios.create({
    baseURL: `${API_URL}/api/auth`,
});

export default authApi;
