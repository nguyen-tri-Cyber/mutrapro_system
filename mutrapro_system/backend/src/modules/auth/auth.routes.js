import { Router } from 'express';
import * as c from './auth.controller.js';
const r = Router();
r.post('/register', c.register);
r.post('/login', c.login);
export default r;
