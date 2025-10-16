import { pool } from '../../config/db.js';

export async function createRequest(req, res, next) {
  try {
    const { serviceCode, title, detail, priority, inputFileId } = req.body;
    const [s] = await pool.execute('SELECT ServiceId FROM Services WHERE Code=?', [serviceCode]);
    if (!s[0]) throw new Error('Service not found');
    const [ins] = await pool.execute(
      `INSERT INTO Requests(CustomerId, ServiceId, Title, Detail, Priority, InputFileId)
       VALUES(?,?,?,?,?,?)`,
      [req.user.uid, s[0].ServiceId, title, detail || null, priority || 2, inputFileId || null]
    );
    const [ret] = await pool.execute('SELECT * FROM Requests WHERE RequestId=?', [ins.insertId]);
    res.json(ret[0]);
  } catch (e) { next(e); }
}

export async function listRequests(req, res, next) {
  try {
    const role = req.user.role;
    let sql, params;
    if (role === 'CUSTOMER') {
      sql = `SELECT r.*, s.Code as ServiceCode
             FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId
             WHERE r.CustomerId=? ORDER BY r.CreatedAt DESC`;
      params = [req.user.uid];
    } else if (['TRANSCRIBER','MIXER','ARTIST'].includes(role)) {
      sql = `SELECT r.*, s.Code as ServiceCode
             FROM Requests r 
             JOIN Services s ON r.ServiceId=s.ServiceId
             JOIN RequestAssignees a ON a.RequestId=r.RequestId
             WHERE a.ExpertId=? ORDER BY r.CreatedAt DESC`;
      params = [req.user.uid];
    } else {
      sql = `SELECT r.*, s.Code as ServiceCode
             FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId
             ORDER BY r.CreatedAt DESC`;
      params = [];
    }
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (e) { next(e); }
}

export async function assignExperts(req, res, next) {
  try {
    const id = Number(req.params.id);
    const [[reqRow]] = await pool.execute(
      `SELECT r.RequestId, s.Code as ServiceCode 
       FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId
       WHERE r.RequestId=?`, [id]
    );
    if (!reqRow) throw new Error('Request not found');

    const neededRole = reqRow.ServiceCode === 'TRANSCRIPTION' ? 'TRANSCRIBER'
                     : reqRow.ServiceCode === 'MIXING' ? 'MIXER'
                     : 'ARTIST';

    const sqlCand = `
      SELECT u.UserId
      FROM Users u 
      JOIN Roles r ON u.RoleId=r.RoleId
      WHERE r.Code=? AND u.IsActive=1
      ORDER BY (
        SELECT COUNT(*) FROM RequestAssignees a 
        JOIN Requests rq ON rq.RequestId=a.RequestId
        WHERE a.ExpertId=u.UserId AND rq.Status IN ('NEW','ASSIGNED','IN_PROGRESS')
      ) ASC
      LIMIT 1
    `;
    const [cand] = await pool.execute(sqlCand, [neededRole]);
    if (!cand[0]) throw new Error('No expert available');
    const expertId = cand[0].UserId;

    await pool.execute(
      'INSERT INTO RequestAssignees(RequestId, ExpertId, RoleCode) VALUES(?,?,?)',
      [id, expertId, neededRole]
    );
    await pool.execute(
      "UPDATE Requests SET Status='ASSIGNED', UpdatedAt=CURRENT_TIMESTAMP WHERE RequestId=?",
      [id]
    );
    await pool.execute(
      'INSERT INTO Notifications(UserId, Message) VALUES(?, ?)',
      [expertId, `Bạn vừa được phân công yêu cầu #${id} (${neededRole}).`]
    );
    res.json({ ok: true, requestId: id, assignedTo: expertId, role: neededRole });
  } catch (e) { next(e); }
}

export async function updateStatus(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { status, outputFileId } = req.body;
    await pool.execute(
      'UPDATE Requests SET Status=?, OutputFileId=?, UpdatedAt=CURRENT_TIMESTAMP WHERE RequestId=?',
      [status, outputFileId || null, id]
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function getDetail(req, res, next) {
  try {
    const id = Number(req.params.id);
    const [[reqRow]] = await pool.execute(
      `SELECT r.*, s.Code as ServiceCode
       FROM Requests r JOIN Services s ON r.ServiceId=s.ServiceId
       WHERE r.RequestId=?`, [id]
    );
    if (!reqRow) return res.json(null);
    const [ass] = await pool.execute(
      'SELECT ExpertId, RoleCode FROM RequestAssignees WHERE RequestId=?',
      [id]
    );
    res.json({ ...reqRow, Assignees: ass });
  } catch (e) { next(e); }
}
