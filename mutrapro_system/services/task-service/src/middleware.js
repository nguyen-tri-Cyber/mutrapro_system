import jwt from 'jsonwebtoken';
export function authRequired(req,res,next){
  const h = req.headers.authorization||'';
  const t = h.startsWith('Bearer ')? h.slice(7): null;
  if(!t) return res.status(401).json({error:'Missing token'});
  try{ req.user = jwt.verify(t, process.env.JWT_SECRET); next(); }
  catch(e){ return res.status(401).json({error:'Invalid token'}); }
}
