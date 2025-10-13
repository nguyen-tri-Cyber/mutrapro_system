import { getPool, sql } from '../../config/db.js';
export async function listMy(req, res, next){
  try{
    const pool = await getPool();
    const rs = await pool.request().input('uid', sql.Int, req.user.uid)
      .query('SELECT TOP 50 * FROM Notifications WHERE UserId=@uid ORDER BY CreatedAt DESC');
    res.json(rs.recordset);
  }catch(e){ next(e); }
}
