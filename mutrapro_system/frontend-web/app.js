const API = 'http://localhost:4000/api';
let token = '';

async function login(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const r = await fetch(`${API}/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });
  const data = await r.json();
  if (data.token){
    token = data.token;
    document.getElementById('me').innerText = `Xin chào: ${data.user.name} (${data.user.role})`;
    document.getElementById('new-request').style.display = 'block';
    document.getElementById('my-requests').style.display = 'block';
    loadRequests();
  } else {
    alert('Login failed');
  }
}

async function createRequest(){
  const serviceCode = document.getElementById('service').value;
  const title = document.getElementById('title').value;
  const detail = document.getElementById('detail').value;
  const priority = Number(document.getElementById('priority').value);
  const r = await fetch(`${API}/requests`, {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body: JSON.stringify({ serviceCode, title, detail, priority })
  });
  const data = await r.json();
  if (data.RequestId){
    alert('Đã tạo yêu cầu #' + data.RequestId);
    await fetch(`${API}/requests/${data.RequestId}/assign`, {
      method:'POST', headers:{'Authorization':'Bearer '+token}
    });
    loadRequests();
  } else {
    alert('Tạo yêu cầu thất bại');
  }
}

async function loadRequests(){
  const r = await fetch(`${API}/requests`, {
    headers:{'Authorization':'Bearer '+token}
  });
  const list = await r.json();
  const ul = document.getElementById('reqList');
  ul.innerHTML = '';
  list.forEach(it => {
    const li = document.createElement('li');
    li.textContent = `#${it.RequestId} [${it.ServiceCode}] ${it.Title} - ${it.Status}`;
    ul.appendChild(li);
  });
}
