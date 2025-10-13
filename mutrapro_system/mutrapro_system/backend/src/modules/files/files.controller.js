import { getPool, sql } from '../../config/db.js';
export async function createByUrl(req, res, next){
  try{
    const { fileName, fileUrl } = req.body;
    const pool = await getPool();
    const rs = await pool.request()
      .input('owner', sql.Int, req.user.uid)
      .input('name', sql.NVarChar, fileName)
      .input('url', sql.NVarChar, fileUrl)
      .query('INSERT INTO Files(OwnerId, FileName, FileUrl) OUTPUT INSERTED.* VALUES(@owner,@name,@url)');
    res.json(rs.recordset[0]);
  }catch(e){ next(e); }
}
