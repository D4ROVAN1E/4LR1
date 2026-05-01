import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import AccountForm from '../components/AccountForm';

const Form = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);

    const handleCreate = async (formData) => {
        try {
            setApiError(null);
            await api.createAccount(formData);
            navigate('/');
        } catch (error) {
            setApiError(error.message);
        }
    };

    return (
        <div>
            <h1>Добавить новую запись</h1>
            {apiError && <div style={{ color: 'red', marginBottom: '10px' }}>{apiError}</div>}
            
            <AccountForm 
                onSubmit={handleCreate} 
                submitText="Добавить в менеджер" 
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default Form;