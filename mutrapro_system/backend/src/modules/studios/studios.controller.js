import { pool } from '../../config/db.js';
export async function listRooms(req, res, next){
  try{
    const [rows] = await pool.execute('SELECT RoomId, Name, Location, Capacity, IsActive FROM StudioRooms WHERE IsActive=1');
    res.json(rows);
  }catch(e){ next(e); }
}
