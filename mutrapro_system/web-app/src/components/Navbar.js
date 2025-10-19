import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MuTraPro
                </Link>
                <div className="nav-menu">
                    <Link to="/" className="nav-item">
                        Trang Chủ
                    </Link>
                    <Link to="/dashboard" className="nav-item">
                        Bảng Điều Khiển
                    </Link>
                    <Link to="/login" className="nav-item nav-button">
                        Đăng Nhập
                    </Link>
                    <Link to="/register" className="nav-item nav-button nav-button-secondary">
                        Đăng Ký
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;