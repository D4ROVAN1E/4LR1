import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const handleApiError = (error) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Произошла ошибка на сервере';
        throw new Error(`Ошибка ${status}: ${message}`);
    } else if (error.request) {
        throw new Error('Ошибка сети: Не удалось связаться с сервером. Проверьте подключение.');
    } else {
        throw new Error(`Ошибка: ${error.message}`);
    }
};

const api = {
    getAccounts: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/accounts`);
            return response.data;
        } catch (error) { throw handleApiError(error); }
    },
    getAccountById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/accounts/${id}`);
            return response.data;
        } catch (error) { throw handleApiError(error); }
    },
    createAccount: async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/accounts`, data, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } catch (error) { throw handleApiError(error); }
    },
    updateAccount: async (id, data) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/accounts/${id}`, data, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } catch (error) { throw handleApiError(error); }
    },
    deleteAccount: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/accounts/${id}`);
        } catch (error) { throw handleApiError(error); }
    }
};

export default api;