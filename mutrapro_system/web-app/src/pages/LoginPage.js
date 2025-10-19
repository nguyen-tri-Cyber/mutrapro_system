import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi'; // Nhớ kiểm tra đường dẫn này

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const responseData = await authApi.login(email, password);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            navigate('/dashboard');
        } catch (err) {
            setError('Email hoặc mật khẩu không đúng!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleLogin} className="form-card">
                <h2>Đăng nhập</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;