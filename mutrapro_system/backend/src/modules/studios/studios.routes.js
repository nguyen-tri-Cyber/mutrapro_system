import { Router } from 'express';
import { authRequired } from '../../middleware/authRequired.js';
import * as c from './studios.controller.js';
const r = Router();
r.get('/rooms', authRequired, c.listRooms);
export default r;
