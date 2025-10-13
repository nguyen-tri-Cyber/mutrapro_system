import { getPool } from '../../config/db.js';
export async function listRooms(req, res, next){
  try{
    const pool = await getPool();
    const rs = await pool.request().query('SELECT RoomId, Name, Location, Capacity, IsActive FROM StudioRooms WHERE IsActive=1');
    res.json(rs.recordset);
  }catch(e){ next(e); }
}
