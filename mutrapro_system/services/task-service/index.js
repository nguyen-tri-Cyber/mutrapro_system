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
    database: process.env.DB_TASK_NAME || 'mutrapro_task'
};

// API Endpoint: Tạo công việc mới
app.post('/tasks', async (req, res) => {
    const { order_id, assigned_to, specialist_role, deadline } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            `INSERT INTO task (order_id, assigned_to, specialist_role, status, assigned_at, deadline)
             VALUES (?, ?, ?, 'assigned', NOW(), ?)`,
            [order_id, assigned_to, specialist_role, deadline]
        );
        res.status(201).json({ id: result.insertId, message: 'Task created' });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// API Endpoint: Cập nhật trạng thái công việc
app.put('/tasks/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE task SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Task status updated' });
    } catch (error) {
        console.error('Update task status error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Task Service is running on port ${PORT}`);
});