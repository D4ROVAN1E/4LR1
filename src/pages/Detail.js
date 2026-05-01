import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import AccountForm from '../components/AccountForm';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [accountData, setAccountData] = useState(null);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                setApiError(null);
                const data = await api.getAccountById(id);
                setAccountData(data);
            } catch (error) {
                setApiError(error.message);
            }
        };
        fetchAccount();
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            setApiError(null);
            await api.updateAccount(id, formData);
            navigate('/');
        } catch (error) {
            setApiError(error.message);
        }
    };

    if (apiError && !accountData) {
        return (
            <div>
                <h2 style={{color: 'red'}}>Ошибка</h2>
                <p>{apiError}</p>
                <button onClick={() => navigate('/')}>Вернуться на главную</button>
            </div>
        );
    }

    if (!accountData) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <div>
            <h1>Редактирование записи</h1>
            {apiError && <div style={{ color: 'red', marginBottom: '10px' }}>{apiError}</div>}
            
            <AccountForm 
                initialData={accountData} 
                onSubmit={handleUpdate} 
                submitText="Сохранить изменения"
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default Detail;
