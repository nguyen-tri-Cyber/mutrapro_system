import express from 'express'; import cors from 'cors'; import morgan from 'morgan'; import dotenv from 'dotenv'; import mysql from 'mysql2/promise';
import { authRequired } from './middleware.js'; dotenv.config();
const app=express(); app.use(cors()); app.use(express.json()); app.use(morgan('dev'));
const pool=await mysql.createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,port:Number(process.env.DB_PORT||3306)});
app.get('/',(req,res)=>res.json({ok:true,service:'order'}));
app.post('/orders',authRequired,async(req,res,n)=>{try{const {service_type,description,price}=req.body;
  const [r]=await pool.execute('INSERT INTO orders(customer_id,service_type,description,price) VALUES(?,?,?,?)',[req.user.uid,service_type,description||null,price||0]);
  res.json({id:r.insertId,status:'pending'});}catch(e){n(e)}});
app.get('/orders',authRequired,async(req,res,n)=>{try{let sql='SELECT * FROM orders ORDER BY id DESC',p=[];
  if(req.user.role==='customer'){sql='SELECT * FROM orders WHERE customer_id=? ORDER BY id DESC'; p=[req.user.uid];}
  const [rows]=await pool.execute(sql,p); res.json(rows);}catch(e){n(e)}});
app.post('/orders/:id/status',authRequired,async(req,res,n)=>{try{await pool.execute('UPDATE orders SET status=?, updated_at=NOW() WHERE id=?',[req.body.status,req.params.id]); res.json({ok:true});}catch(e){n(e)}});
app.use((e,req,res,n)=>{console.error(e); res.status(500).json({error:e.message})}); app.listen(process.env.PORT,()=>console.log('order on',process.env.PORT));
