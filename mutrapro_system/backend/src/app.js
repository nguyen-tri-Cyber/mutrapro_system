import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import requestsRoutes from './modules/requests/requests.routes.js';
import studiosRoutes from './modules/studios/studios.routes.js';
import notificationsRoutes from './modules/notifications/notifications.routes.js';
import filesRoutes from './modules/files/files.routes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/', (_, res) => res.json({ ok: true, service: 'MuTraPro API (MySQL)' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/studios', studiosRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/files', filesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`MuTraPro API listening on :${PORT}`));
