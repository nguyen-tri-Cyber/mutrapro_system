# mutrapro_system
Custom Music Transcription and Production System

Hướng dẫn sử dụng trước khi dùng:
Cách chạy:
Cài Docker mới làm được
1.Mở docker + Xampp
2. Mở file dự án trong vscode (nhớ copy dự án vào ổ D nhe, làm cho dễ)
Chạy thử lệnh xem có kết nối dc với Docker chưa: docker version (nói chiện vs daemon)

**Xoá dòng version trong compose:**
Mở docker-compose.yml, xoá dòng:
version: '3.9'

**Đảm bảo không bị trùng port MySQL:** (cũng trong file docker-compose.yml)
# đổi từ
ports: ["3306:3306"]
# sang
ports: ["3307:3306"]
Nếu đổi sang 3307, các tool ngoài container sẽ kết nối localhost:3307. Bên trong compose các service vẫn dùng host mysql:3306 (không đổi).

File sharing ổ D:
Docker Desktop → Settings → Resources → File Sharing → bật quyền cho ổ D:
(vì bạn bind D:\mutrapro_system\db\init vào container MySQL).

Build & chạy stack:
Mở terminal và chạy lệnh sau:
docker compose build --no-cache
docker compose up -d

Test nhanh
Gateway: http://localhost:4000
 → trả { ok: true, gateway: true }

Web demo: http://localhost:5173

**Bước này là phải tải POSTMAN về máy**
Đăng ký user (Postman):
POST http://localhost:4000/api/auth/register
Body (JSON): { "name":"Cus One","email":"c1@mp.com","password":"123456","role":"customer" }   tương tự với các tài khoản khác. Lưu mỗi lần tạo xong bấm send rồi xóa cái cũ paste cái mới vô rồi send.

{
  "name": "System Admin",
  "email": "admin@mp.com",
  "password": "123456",
  "role": "admin"
}

{
  "name": "Studio Admin",
  "email": "studio@mp.com",
  "password": "123456",
  "role": "studio_admin"
}

{
  "name": "Coordinator One",
  "email": "coor1@mp.com",
  "password": "123456",
  "role": "coordinator"
}

{
  "name": "Tran Scriber",
  "email": "t1@mp.com",
  "password": "123456",
  "role": "transcriber"
}

{
  "name": "Mix Er",
  "email": "m1@mp.com",
  "password": "123456",
  "role": "arranger"
}

{
  "name": "Art Ist",
  "email": "a1@mp.com",
  "password": "123456",
  "role": "artist"
}


<img width="1089" height="268" alt="image" src="https://github.com/user-attachments/assets/b9fffe86-eccb-426a-bf8f-51386471206a" />


Đăng nhập:
POST http://localhost:4000/api/auth/login
{ "email":"c1@mp.com", "password":"123456" } tương tự với các tài khoản khác

Dùng token trả về để gọi các API khác (Orders/Tasks/...).




