import axios from 'axios';

// Địa chỉ của Auth Service
const API_URL = 'http://localhost:3001';

/**
 * Gửi yêu cầu đăng nhập đến server.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Dữ liệu người dùng nếu thành công.
 */
const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // Trả về toàn bộ data từ response
    } catch (error) {
        // Ném lỗi ra ngoài để component có thể bắt và xử lý
        throw error;
    }
};

/**
 * Gửi yêu cầu đăng ký tài khoản mới.
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Dữ liệu phản hồi từ server.
 */
const register = async (name, email, password, role = 'customer') => { // Thêm role ở đây
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
            role // Truyền role vào request
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Gom các hàm vào một object để export
const authApi = {
    login,
    register
};

export default authApi;