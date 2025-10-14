const API = 'http://10.0.2.2:4000/api'; // Android emulator
let token = '';

export function setToken(t){ token = t; }
export async function apiPost(path, body){
  const r = await fetch(`${API}${path}`, {
    method:'POST',
    headers:{'Content-Type':'application/json', ...(token? {Authorization:'Bearer '+token}:{})},
    body: JSON.stringify(body||{})
  });
  return r.json();
}
export async function apiGet(path){
  const r = await fetch(`${API}${path}`, { headers: token? {Authorization:'Bearer '+token}:{}} );
  return r.json();
}
