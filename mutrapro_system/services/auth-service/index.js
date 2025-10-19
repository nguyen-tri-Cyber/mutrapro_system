const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_AUTH_NAME || 'mutrapro_auth'
};

// API Endpoint: Đăng ký người dùng
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    // Lưu ý: Cần mã hóa mật khẩu trước khi lưu vào DB
    // Ví dụ: const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role] // Thay password bằng hashedPassword
        );
        res.status(201).json({ id: result.insertId, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// API Endpoint: Đăng nhập
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // So sánh mật khẩu đã mã hóa
        // const user = rows[0];
        // const isMatch = await bcrypt.compare(password, user.password_hash);
        // if (!isMatch) {
        //     return res.status(401).json({ error: 'Invalid credentials' });
        // }
        res.json({ message: 'Login successful', user: rows[0] });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});