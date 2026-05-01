import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Home = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setApiError(null);
            const result = await api.getAccounts();
            setData(result);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить эту запись?")) return;
        
        try {
            setApiError(null);
            await api.deleteAccount(id);
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            setApiError(error.message);
        }
    };

    return (
        <div>
            <div className="header-actions">
                <h1>Менеджер паролей</h1>
                <Link to="/add" className="btn btn-primary">
                    Добавить запись
                </Link>
            </div>
            
            {apiError && <div className="card" style={{ borderLeft: '4px solid #e74c3c', color: '#e74c3c' }}>{apiError}</div>}
            
            {isLoading ? (
                <p>Загрузка данных...</p>
            ) : (
                <ul className="no-bullets">
                    {data.map(item => (
                        <li key={item.id} className="card">
                            <Link to={`/detail/${item.id}`} className="service-link">
                                {item.service}
                            </Link>
                            <div style={{ color: '#7f8c8d', marginTop: '5px' }}>
                                Логин: {item.login}
                            </div>
                            <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
            
            {data.length === 0 && !isLoading && !apiError && <div className="card">Записей пока нет. Создайте первую!</div>}
        </div>
    );
};

export default Home;