import { pool } from '../../config/db.js';
export async function listMy(req, res, next){
  try{
    const [rows] = await pool.execute(
      'SELECT NotificationId, Message, IsRead, CreatedAt FROM Notifications WHERE UserId=? ORDER BY CreatedAt DESC LIMIT 50',
      [req.user.uid]
    );
    res.json(rows);
  }catch(e){ next(e); }
}
