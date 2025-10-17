import express from 'express'; import cors from 'cors'; import morgan from 'morgan'; import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; import bcrypt from 'bcryptjs'; import mysql from 'mysql2/promise';
dotenv.config(); const app=express(); app.use(cors()); app.use(express.json()); app.use(morgan('dev'));
const pool = await mysql.createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,port:Number(process.env.DB_PORT||3306)});
app.get('/',(req,res)=>res.json({ok:true,service:'auth'}));
app.post('/register', async (req,res,next)=>{try{
  const { name,email,password,role } = req.body; const hash=await bcrypt.hash(password,10);
  await pool.execute('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)',[name,email,hash,role||'customer']);
  res.json({ok:true,email,role:role||'customer'});}catch(e){next(e)}});
app.post('/login', async (req,res,next)=>{try{
  const { email,password }=req.body; const [rows]=await pool.execute('SELECT * FROM users WHERE email=?',[email]);
  const u=rows[0]; if(!u) return res.status(401).json({error:'Invalid credentials'});
  const ok=await bcrypt.compare(password,u.password_hash); if(!ok) return res.status(401).json({error:'Invalid credentials'});
  const token=jwt.sign({uid:u.id,role:u.role,name:u.name,email:u.email},process.env.JWT_SECRET,{expiresIn:'7d'});
  res.json({token,user:{id:u.id,name:u.name,role:u.role,email:u.email}});}catch(e){next(e)}});
app.use((e,req,res,n)=>{console.error(e); res.status(500).json({error:e.message})}); app.listen(process.env.PORT,()=>console.log('auth on',process.env.PORT));
