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
    database: process.env.DB_STUDIO_NAME || 'mutrapro_studio'
};

// API Endpoint: Lấy danh sách phòng thu
app.get('/studios', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM studios');
        res.json(rows);
    } catch (error) {
        console.error('Get studios error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});


// API Endpoint: Đặt lịch phòng thu
app.post('/bookings', async (req, res) => {
    const { studio_id, artist_id, order_id, start_time, end_time } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            `INSERT INTO booking (studio_id, artist_id, order_id, start_time, end_time, status)
             VALUES (?, ?, ?, ?, ?, 'scheduled')`,
            [studio_id, artist_id, order_id, start_time, end_time]
        );
        res.status(201).json({ id: result.insertId, message: 'Booking created' });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Studio Service is running on port ${PORT}`);
});