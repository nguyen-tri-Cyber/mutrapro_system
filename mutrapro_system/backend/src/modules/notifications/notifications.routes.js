import { Router } from 'express';
import { authRequired } from '../../middleware/authRequired.js';
import * as c from './notifications.controller.js';
const r = Router();
r.get('/', authRequired, c.listMy);
export default r;
