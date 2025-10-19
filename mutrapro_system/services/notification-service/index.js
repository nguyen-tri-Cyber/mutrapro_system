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
    database: process.env.DB_NOTIFICATION_NAME || 'mutrapro_notification'
};

// API Endpoint: Gửi thông báo
app.post('/send', async (req, res) => {
    const { user_id, title, message, channel } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            `INSERT INTO notifications (user_id, title, message, channel, status, created_at)
             VALUES (?, ?, ?, ?, 'pending', NOW())`,
            [user_id, title, message, channel]
        );
        // Logic gửi thông báo thực tế (qua email, system...) sẽ được thêm ở đây
        res.status(201).json({ id: result.insertId, message: 'Notification queued for sending' });
    } catch (error) {
        console.error('Send notification error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});