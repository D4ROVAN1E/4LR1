import React, { useState } from 'react';

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return re.test(password);
};

const AccountForm = ({ initialData, onSubmit, submitText, onCancel }) => {
    const [formData, setFormData] = useState(initialData || { service: '', login: '', password: '' });
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!formData.service.trim()) {
            errors.service = "Название сервиса обязательно";
        }
        if (!validateEmail(formData.login)) {
            errors.login = "Введите корректный email адрес";
        }
        if (!validatePassword(formData.password)) {
            errors.password = "Пароль должен быть от 8 символов, содержать минимум 1 цифру и 1 заглавную букву";
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
                <label>Название сервиса:</label>
                <input 
                    type="text" 
                    name="service"
                    className="form-control"
                    value={formData.service} 
                    onChange={handleChange} 
                />
                {validationErrors.service && <span className="error-text">{validationErrors.service}</span>}
            </div>
            
            <div className="form-group">
                <label>Логин (Email):</label>
                <input 
                    type="text" 
                    name="login"
                    className="form-control"
                    value={formData.login} 
                    onChange={handleChange} 
                />
                {validationErrors.login && <span className="error-text">{validationErrors.login}</span>}
            </div>
            
            <div className="form-group">
                <label>Пароль:</label>
                <input 
                    type="text" 
                    name="password"
                    className="form-control"
                    value={formData.password} 
                    onChange={handleChange} 
                />
                {validationErrors.password && <span className="error-text">{validationErrors.password}</span>}
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary">{submitText}</button>
                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ marginLeft: "10px" }}>Отмена</button>
                )}
            </div>
        </form>
    );
};

export default AccountForm;