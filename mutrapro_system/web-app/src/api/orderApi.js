import axios from 'axios';

// Địa chỉ của Order Service
const API_URL = 'http://localhost:3002';

/**
 * Tạo một đơn hàng mới.
 * @param {object} orderData - Dữ liệu của đơn hàng, ví dụ: { customer_id, service_type, description, price }
 * @returns {Promise<object>} Dữ liệu phản hồi từ server.
 */
const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// (Trong tương lai, bạn có thể thêm các hàm khác vào đây)
// const getOrdersByCustomerId = async (customerId) => { ... };

const orderApi = {
    createOrder
};

export default orderApi;