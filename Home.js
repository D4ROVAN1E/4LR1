import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    // 1. Используем useState для хранения данных. Когда setData обновит данные, страница перерисуется сама.
    const [data, setData] = useState([]);

    // 2. Используем useEffect для загрузки данных при первом открытии страницы.
    useEffect(() => {
        axios.get("http://localhost:5000/accounts")
            .then(response => {
                setData(response.data);
                console.log("Данные загружены:", response.data);
            })
            .catch(error => console.error("Ошибка запроса:", error));
    }, []); // Пустой массив [] означает "выполнить только один раз при запуске"

    // 3. Функция удаления теперь внутри компонента, чтобы иметь доступ к setData
    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/accounts/${id}`)
            .then(() => {
                console.log(`Учетная запись ${id} удалена`);
                // Обновляем состояние: оставляем только те элементы, id которых не совпадает с удаленным
                setData(prevData => prevData.filter(item => item.id !== id));
            })
            .catch(error => console.error("Ошибка удаления:", error));
    };

    return (
        <div>
            <h1>Менеджер паролей</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id} style={{ marginBottom: "10px" }}>
                        <Link to={`/detail/${item.id}`}>Сервис: {item.service}</Link>
                        <br />
                        <small>Логин: {item.login}</small>
                        <button onClick={() => deleteItem(item.id)} style={{marginLeft: "15px"}}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/add">
                <button>Добавить новую запись</button>
            </Link>
        </div>
    );
};

export default Home;