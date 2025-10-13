import { getPool, sql } from '../../config/db.js';

export async function createRequest(req, res, next) {
  try {
    const { serviceCode, title, detail, priority, inputFileId } = req.body;
    const pool = await getPool();
    const s = await pool.request()
      .input('code', sql.NVarChar, serviceCode)
      .query('SELECT ServiceId FROM Services WHERE Code=@code');
    if (!s.recordset[0]) throw new Error('Service not found');

    const rs = await pool.request()
      .input('cid', sql.Int, req.user.uid)
      .input('sid', sql.Int, s.recordset[0].ServiceId)
      .input('title', sql.NVarChar, title)
      .input('detail', sql.NVarChar, detail || null)
      .input('pri', sql.TinyInt, priority || 2)
      .input('infile', sql.Int, inputFileId || null)
      .query(`
        INSERT INTO Requests(CustomerId, ServiceId, Title, Detail, Priority, InputFileId)
        OUTPUT INSERTED.*
        VALUES (@cid,@sid,@title,@detail,@pri,@infile)
      `);
    res.json(rs.recordset[0]);
  } catch (e) { next(e); }
}

export async function listRequests(req, res, next) {
  try {
    const pool = await getPool();
    const role = req.user.role;

    let q = `SELECT r.*, s.Code as ServiceCode
             FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId `;
    if (role === 'CUSTOMER') {
      q += `WHERE r.CustomerId=@uid ORDER BY r.CreatedAt DESC`;
    } else if (['TRANSCRIBER','MIXER','ARTIST'].includes(role)) {
      q = `
        SELECT r.*, s.Code as ServiceCode
        FROM Requests r 
        JOIN Services s ON r.ServiceId=s.ServiceId
        JOIN RequestAssignees a ON a.RequestId=r.RequestId
        WHERE a.ExpertId=@uid
        ORDER BY r.CreatedAt DESC
      `;
    } else { // ADMIN, STUDIO_ADMIN
      q += `ORDER BY r.CreatedAt DESC`;
    }
    const rs = await pool.request().input('uid', sql.Int, req.user.uid).query(q);
    res.json(rs.recordset);
  } catch (e) { next(e); }
}

export async function assignExperts(req, res, next) {
  try {
    const id = Number(req.params.id);
    const pool = await getPool();

    const r = await pool.request().input('id', sql.Int, id)
      .query(`SELECT r.RequestId, s.Code as ServiceCode 
              FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId
              WHERE r.RequestId=@id`);
    const reqRow = r.recordset[0];
    if (!reqRow) throw new Error('Request not found');

    const neededRole = reqRow.ServiceCode === 'TRANSCRIPTION' ? 'TRANSCRIBER'
                       : reqRow.ServiceCode === 'MIXING' ? 'MIXER'
                       : 'ARTIST';

    const candidate = await pool.request()
      .input('role', sql.NVarChar, neededRole)
      .query(`
        SELECT TOP 1 u.UserId
        FROM Users u 
        JOIN Roles r ON u.RoleId=r.RoleId
        WHERE r.Code=@role AND u.IsActive=1
        ORDER BY (
          SELECT COUNT(*) FROM RequestAssignees a 
          JOIN Requests rq ON rq.RequestId=a.RequestId
          WHERE a.ExpertId=u.UserId AND rq.Status IN ('NEW','ASSIGNED','IN_PROGRESS')
        ) ASC
      `);
    const expert = candidate.recordset[0];
    if (!expert) throw new Error('No expert available');

    await pool.request()
      .input('rid', sql.Int, id)
      .input('eid', sql.Int, expert.UserId)
      .input('role', sql.NVarChar, neededRole)
      .query(`INSERT INTO RequestAssignees(RequestId, ExpertId, RoleCode) VALUES (@rid,@eid,@role);
              UPDATE Requests SET Status='ASSIGNED', UpdatedAt=SYSUTCDATETIME() WHERE RequestId=@rid; 
    `);

    await pool.request()
      .input('uid', sql.Int, expert.UserId)
      .input('msg', sql.NVarChar, `Bạn vừa được phân công yêu cầu #${id} (${neededRole}).`)
      .query(`INSERT INTO Notifications(UserId, Message) VALUES (@uid,@msg)`);

    res.json({ ok: true, requestId: id, assignedTo: expert.UserId, role: neededRole });
  } catch (e) { next(e); }
}

export async function updateStatus(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { status, outputFileId } = req.body;
    const pool = await getPool();

    await pool.request()
      .input('id', sql.Int, id)
      .input('st', sql.NVarChar, status)
      .input('out', sql.Int, outputFileId || null)
      .query(`UPDATE Requests SET Status=@st, OutputFileId=@out, UpdatedAt=SYSUTCDATETIME() WHERE RequestId=@id`);

    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function getDetail(req, res, next) {
  try {
    const id = Number(req.params.id);
    const pool = await getPool();
    const rs = await pool.request().input('id', sql.Int, id).query(`
      SELECT r.*, s.Code as ServiceCode,
        (SELECT a.ExpertId, a.RoleCode FROM RequestAssignees a WHERE a.RequestId=r.RequestId FOR JSON PATH) as Assignees
      FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId
      WHERE r.RequestId=@id
    `);
    res.json(rs.recordset[0] || null);
  } catch (e) { next(e); }
}
