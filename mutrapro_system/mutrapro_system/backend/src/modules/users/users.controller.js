import { getPool, sql } from '../../config/db.js';
export async function listUsersByRole(req, res, next){
  try{
    const { role } = req.query;
    const pool = await getPool();
    const q = role ? 
      `SELECT u.UserId, u.FullName, r.Code as RoleCode FROM Users u JOIN Roles r ON u.RoleId=r.RoleId WHERE r.Code=@role AND u.IsActive=1`
      : `SELECT u.UserId, u.FullName, r.Code as RoleCode FROM Users u JOIN Roles r ON u.RoleId=r.RoleId WHERE u.IsActive=1`;
    const rs = await pool.request().input('role', sql.NVarChar, role||null).query(q);
    res.json(rs.recordset);
  }catch(e){ next(e); }
}
