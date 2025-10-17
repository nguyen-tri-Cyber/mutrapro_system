import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));

const map = {
  '/api/auth': process.env.AUTH_URL,
  '/api/orders': process.env.ORDER_URL,
  '/api/tasks': process.env.TASK_URL,
  '/api/files': process.env.FILE_URL,
  '/api/studios': process.env.STUDIO_URL,
  '/api/notifications': process.env.NOTI_URL
};

app.get('/', (req,res)=>res.json({ok:true, gateway:true}));

for (const [path, target] of Object.entries(map)) {
  app.use(path, createProxyMiddleware({ target, changeOrigin: true, pathRewrite: { [`^${path}`]: '' } }));
}

app.listen(process.env.PORT||4000, ()=> console.log('gateway on', process.env.PORT||4000));
