import { pool } from '../../config/db.js';
export async function createByUrl(req, res, next){
  try{
    const { fileName, fileUrl } = req.body;
    const [ins] = await pool.execute(
      'INSERT INTO Files(OwnerId, FileName, FileUrl) VALUES(?,?,?)',
      [req.user.uid, fileName, fileUrl]
    );
    const [rows] = await pool.execute('SELECT * FROM Files WHERE FileId=?', [ins.insertId]);
    res.json(rows[0]);
  }catch(e){ next(e); }
}
