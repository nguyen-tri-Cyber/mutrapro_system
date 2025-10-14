import { pool } from '../../config/db.js';
export async function listUsersByRole(req, res, next){
  try{
    const { role } = req.query;
    const sql = role ?
      `SELECT u.UserId, u.FullName, r.Code as RoleCode FROM Users u JOIN Roles r ON u.RoleId=r.RoleId WHERE r.Code=? AND u.IsActive=1`
      : `SELECT u.UserId, u.FullName, r.Code as RoleCode FROM Users u JOIN Roles r ON u.RoleId=r.RoleId WHERE u.IsActive=1`;
    const params = role ? [role] : [];
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  }catch(e){ next(e); }
}
