import jwt from 'jsonwebtoken';
import { getPool, sql } from '../../config/db.js';
import { hashPassword, comparePassword } from '../../utils/password.js';

export async function register(req, res, next) {
  try {
    const { fullName, email, password, roleCode } = req.body;
    const pool = await getPool();
    const role = await pool.request()
      .input('code', sql.NVarChar, roleCode || 'CUSTOMER')
      .query('SELECT RoleId FROM Roles WHERE Code=@code');
    if (!role.recordset[0]) throw new Error('Role not found');
    const pw = await hashPassword(password);
    const ins = await pool.request()
      .input('fn', sql.NVarChar, fullName)
      .input('em', sql.NVarChar, email)
      .input('pw', sql.NVarChar, pw)
      .input('rid', sql.Int, role.recordset[0].RoleId)
      .query(`
        INSERT INTO Users(FullName, Email, PasswordHash, RoleId)
        OUTPUT INSERTED.UserId, INSERTED.FullName, INSERTED.Email, INSERTED.RoleId
        VALUES (@fn,@em,@pw,@rid)
      `);
    res.json(ins.recordset[0]);
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const pool = await getPool();
    const rs = await pool.request()
      .input('em', sql.NVarChar, email)
      .query(`SELECT u.UserId, u.FullName, u.Email, u.PasswordHash, r.Code as RoleCode
              FROM Users u JOIN Roles r ON u.RoleId=r.RoleId
              WHERE u.Email=@em AND u.IsActive=1`);
    const user = rs.recordset[0];
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
