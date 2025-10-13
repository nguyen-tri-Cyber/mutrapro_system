import { Router } from 'express';
import { authRequired } from '../../middleware/authRequired.js';
import * as c from './users.controller.js';
const r = Router();
r.get('/', authRequired, c.listUsersByRole); // /api/users?role=TRANSCRIBER
export default r;
