import jwt from 'jsonwebtoken';
import { pool } from '../../config/db.js';
import { hashPassword, comparePassword } from '../../utils/password.js';

export async function register(req, res, next) {
  try {
    const { fullName, email, password, roleCode='CUSTOMER' } = req.body;
    const [roleRows] = await pool.execute('SELECT RoleId FROM Roles WHERE Code=?', [roleCode]);
    if (!roleRows[0]) throw new Error('Role not found');

    const pw = await hashPassword(password);
    const [ins] = await pool.execute(
      'INSERT INTO Users(FullName,Email,PasswordHash,RoleId) VALUES(?,?,?,?)',
      [fullName, email, pw, roleRows[0].RoleId]
    );
    const userId = ins.insertId;
    res.json({ UserId: userId, FullName: fullName, Email: email, RoleId: roleRows[0].RoleId });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.execute(
      `SELECT u.UserId, u.FullName, u.Email, u.PasswordHash, r.Code as RoleCode
       FROM Users u JOIN Roles r ON u.RoleId=r.RoleId
       WHERE u.Email=? AND u.IsActive=1`,
      [email]
    );
    const user = rows[0];
    if (!user) throw new Error('Invalid credentials');
    const ok = await comparePassword(password, user.PasswordHash);
    if (!ok) throw new Error('Invalid credentials');
    const token = jwt.sign(
      { uid: user.UserId, role: user.RoleCode, name: user.FullName },
      process.env.JWT_SECRET, { expiresIn: '7d' }
    );
    res.json({ token, user: { userId: user.UserId, name: user.FullName, role: user.RoleCode }});
  } catch (e) { e.status=401; next(e); }
}
