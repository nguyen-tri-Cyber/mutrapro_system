import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderApi from '../api/orderApi'; // Import API để tạo đơn hàng

const CreateOrderPage = () => {
    const [serviceType, setServiceType] = useState('transcription'); // Giá trị mặc định
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0); // Tạm thời để giá là 0
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage để biết ai là người tạo đơn hàng
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Nếu chưa đăng nhập, đá về trang login
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!user) {
            setError('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
            setLoading(false);
            return;
        }

        try {
            const orderData = {
                customer_id: user.id,
                service_type: serviceType,
                description: description,
                price: price // Bạn có thể tính giá dựa trên dịch vụ sau
            };

            await orderApi.createOrder(orderData);

            alert('Tạo đơn hàng thành công!');
            navigate('/dashboard'); // Quay về trang Dashboard sau khi tạo xong

        } catch (err) {
            setError('Tạo đơn hàng thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-card">
                <h2>Tạo Yêu Cầu Dịch Vụ Mới</h2>

                <div className="form-group">
                    <label>Chọn loại dịch vụ</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <option value="transcription">Ký âm (Transcription)</option>
                        <option value="arrangement">Hòa âm, Phối khí (Arrangement)</option>
                        <option value="recording">Thu âm (Recording)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Mô tả chi tiết yêu cầu</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="5"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        placeholder="Ví dụ: Em cần ký âm bài hát 'See Tình' của Hoàng Thùy Linh..."
                    />
                </div>

                {/* Bạn có thể thêm phần upload file ở đây sau khi chức năng file-service hoạt động ổn định */}

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu'}
                </button>
            </form>
        </div>
    );
};

export default CreateOrderPage;