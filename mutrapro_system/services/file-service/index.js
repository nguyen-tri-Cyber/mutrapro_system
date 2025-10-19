const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Đảm bảo thư mục 'uploads' tồn tại
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const dbConfig = {
    host: process.env.DB_HOST || 'mysql_db', // Mặc định là tên service DB trong Docker
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'your_strong_password',
    database: process.env.DB_FILE_NAME || 'mutrapro_file'
};

console.log('---DATABASE CONFIG---', dbConfig);

const upload = multer({ dest: 'uploads/' });

// Endpoint đơn giản để kiểm tra service có "sống" hay không
app.get('/ping', (req, res) => {
    console.log('>>> Received a PING request!');
    res.status(200).send('Pong from File Service!');
});

// Endpoint chính để tải file lên
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('Step 1: Received file upload request.');

    const { order_id, uploader_id, file_type } = req.body;
    const file = req.file;

    if (!file) {
        console.error('Upload failed: No file was provided in the request.');
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('File details:', file);
    console.log('Body details:', req.body);

    const { originalname, path: filePath } = file;

    let connection;
    try {
        console.log('Step 2: Attempting to connect to the database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Step 3: Database connection successful! Inserting data...');

        const [result] = await connection.execute(
            `INSERT INTO file (order_id, uploader_id, file_name, file_path, file_type)
             VALUES (?, ?, ?, ?, ?)`,
            [order_id, uploader_id, originalname, filePath, file_type]
        );
        
        console.log('Step 4: Data inserted successfully. Insert ID:', result.insertId);
        res.status(201).json({ id: result.insertId, message: 'File uploaded successfully', filePath: filePath });

    } catch (error) {
        console.error('---!!! DATABASE OPERATION FAILED !!!---:', error);
        res.status(500).json({ error: 'Database error', details: error.message });
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed.');
        }
    }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`File Service is running on port ${PORT}`);
});