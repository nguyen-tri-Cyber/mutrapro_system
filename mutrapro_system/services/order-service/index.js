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
    database: process.env.DB_ORDER_NAME || 'mutrapro_order'
};

// API Endpoint: Tạo đơn hàng mới
app.post('/orders', async (req, res) => {
    const { customer_id, service_type, description, price } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            `INSERT INTO orders (customer_id, service_type, description, price, status, created_at, update_at)
             VALUES (?, ?, ?, ?, 'pending', NOW(), NOW())`,
            [customer_id, service_type, description, price]
        );
        res.status(201).json({ id: result.insertId, message: 'Order created' });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// API Endpoint MỚI: Lấy tất cả đơn hàng của một khách hàng
app.get('/orders/customer/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC', 
            [customerId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Get orders by customer error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
});