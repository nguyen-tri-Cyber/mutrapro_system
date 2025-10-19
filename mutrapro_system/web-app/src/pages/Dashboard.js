import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// (Tưởng tượng đây là các component chức năng bạn sẽ tạo sau này)
const CustomerDashboard = ({ user }) => (
    <div className="dashboard-features">
        <h3>Chức năng của Khách hàng</h3>
        <ul>
            <li><Link to="/orders/new">Tạo đơn hàng mới</Link></li>
            <li><Link to="/orders/history">Xem lịch sử đơn hàng</Link></li>
            <li><Link to="/profile">Chỉnh sửa hồ sơ</Link></li>
        </ul>
    </div>
);

const ArtistDashboard = ({ user }) => (
    <div className="dashboard-features">
        <h3>Nhiệm vụ của Nghệ sĩ</h3>
        <ul>
            <li><Link to="/tasks">Xem nhiệm vụ được giao</Link></li>
            <li><Link to="/studio/booking">Đặt lịch phòng thu</Link></li>
        </ul>
    </div>
);


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    // Hàm render các chức năng dựa trên vai trò
    const renderRoleDashboard = () => {
        if (!user) return null;

        switch (user.role) {
            case 'customer':
                return <CustomerDashboard user={user} />;
            case 'artist':
                return <ArtistDashboard user={user} />;
            // Thêm các case khác cho 'admin', 'coordinator'... ở đây
            default:
                return <p>Vai trò của bạn chưa có chức năng nào.</p>;
        }
    };

    if (!user) {
        return (
            <div className="page-container">
                <h1>Bạn cần đăng nhập để xem trang này</h1>
                <Link to="/login" className="form-button" style={{ textDecoration: 'none', marginTop: '20px' }}>
                    Đi đến trang Đăng nhập
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ alignItems: 'flex-start', maxWidth: '1000px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <h1>Chào mừng trở lại, {user.name}!</h1>
                <button onClick={handleLogout} className="form-button" style={{ backgroundColor: '#dc3545', width: 'auto' }}>
                    Đăng xuất
                </button>
            </div>
            <p style={{ marginBottom: '30px' }}>Đây là bảng điều khiển của bạn. <strong>Vai trò:</strong> {user.role}</p>

            {/* Hiển thị các chức năng tương ứng với vai trò */}
            {renderRoleDashboard()}
        </div>
    );
};

export default Dashboard;