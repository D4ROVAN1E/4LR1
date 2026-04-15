import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Изменение: Вместо простого статуса загрузки (isLoading), 
    // мы теперь храним в состоянии сами загруженные данные.
    // Изначально оно null (данных еще нет).
    const [accountData, setAccountData] = useState(null);

    const serviceRef = useRef(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/accounts/${id}`)
            .then(response => {
                // 2. Изменение: Как только данные пришли, мы просто сохраняем их в состояние.
                // React сам поймет, что нужно перерисовать компонент.
                setAccountData(response.data);
                console.log("Загруженная запись:", response.data);
            })
            .catch(error => {
                console.error("Ошибка загрузки:", error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedItem = {
            service: serviceRef.current.value,
            login: loginRef.current.value,
            password: passwordRef.current.value,
        };

        axios.put(`http://localhost:5000/accounts/${id}`, JSON.stringify(updatedItem), {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                console.log("Обновлённая запись:", response.data);
                navigate('/');
            })
            .catch(error => console.error("Ошибка обновления:", error));
    };

    // 3. Изменение: Если данных еще нет (равно null), значит идет загрузка
    if (!accountData) {
        return <div>Загрузка данных...</div>;
    }

    // 4. Изменение: Когда данные есть, мы отрисовываем форму и передаем 
    // начальные значения напрямую в input через свойство defaultValue
    return (
        <div>
            <h1>Редактирование записи</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Название сервиса:
                    <input type="text" ref={serviceRef} defaultValue={accountData.service} required />
                </label>
                <br /><br />
                <label>
                    Логин:
                    <input type="text" ref={loginRef} defaultValue={accountData.login} required />
                </label>
                <br /><br />
                <label>
                    Пароль:
                    <input type="text" ref={passwordRef} defaultValue={accountData.password} required />
                </label>
                <br /><br />
                <button type="submit">Сохранить изменения</button>
            </form>
            <br />
            <button onClick={() => navigate('/')}>Отмена</button>
        </div>
    );
};

export default Detail;