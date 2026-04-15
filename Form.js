import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const serviceRef = useRef(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    let newAccountData = {}; // Локальная переменная для новой записи

    // Функция сохранения новой записи (POST запрос)
    const handleSubmit = (e) => {
        e.preventDefault();
        newAccountData = {
            service: serviceRef.current.value,
            login: loginRef.current.value,
            password: passwordRef.current.value,
        };

        axios.post('http://localhost:5000/accounts', JSON.stringify(newAccountData), {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                console.log("Добавленная запись:", response.data);
                navigate('/');
            })
            .catch(error => console.error("Ошибка создания:", error));
    };

    return (
        <div>
            <h1>Добавить новую запись</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Название сервиса:
                    <input type="text" ref={serviceRef} required />
                </label>
                <br /><br />
                <label>
                    Логин:
                    <input type="text" ref={loginRef} required />
                </label>
                <br /><br />
                <label>
                    Пароль:
                    <input type="text" ref={passwordRef} required />
                </label>
                <br /><br />
                <button type="submit">Добавить в менеджер</button>
            </form>
        </div>
    );
};

export default Form;