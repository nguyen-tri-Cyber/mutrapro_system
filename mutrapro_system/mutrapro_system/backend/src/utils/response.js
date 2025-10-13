export const ok = (res, data) => res.json(data);
export const fail = (res, msg='Bad request', code=400) => res.status(code).json({ error: msg });
