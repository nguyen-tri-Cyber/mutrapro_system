import { Router } from 'express';
import { authRequired } from '../../middleware/authRequired.js';
import * as c from './files.controller.js';
const r = Router();
r.post('/', authRequired, c.createByUrl);
export default r;
