# MuTraPro — Full Project (Microservices + Web + Mobile)

- 6 services (auth, order, task, file, studio, notification) + **API Gateway** + **MySQL** (6 schema) + **Web demo** + **Mobile (Expo)**
- Dùng **Docker** để chạy backend + web; mobile chạy riêng (Expo).

## 1) Chạy backend + web bằng Docker
```bash
docker compose up --build
# Gateway: http://localhost:4000
# Web:     http://localhost:5173
# MySQL:   3306 (user: root / pass: rootpwd)
```

### Đăng ký & đăng nhập (qua Gateway)
```
POST http://localhost:4000/api/auth/register
{ "name":"Cus One", "email":"c1@mp.com", "password":"123456", "role":"customer" }
{ "name":"Tran Scriber", "email":"t1@mp.com", "password":"123456", "role":"transcriber" }
{ "name":"Mix Er", "email":"m1@mp.com", "password":"123456", "role":"arranger" }
{ "name":"Art Ist", "email":"a1@mp.com", "password":"123456", "role":"artist" }
{ "name":"Studio Admin", "email":"studio@mp.com", "password":"123456", "role":"studio_admin" }
{ "name":"System Admin", "email":"admin@mp.com", "password":"123456", "role":"admin" }

POST http://localhost:4000/api/auth/login
{ "email":"c1@mp.com", "password":"123456" }
```

### Order nhanh
```
POST http://localhost:4000/api/orders/orders   (Bearer token)
{ "service_type":"recording", "description":"Thu âm demo", "price":0 }
```

## 2) Chạy Mobile (Expo)
```bash
cd mobile-app/mutrapro_mobile
npm install
npm start
# Android emulator dùng base URL 10.0.2.2:4000; iOS/desktop dùng localhost:4000
```

## Thư mục
```
services/           # 6 services Node.js (Express)
gateway/            # API gateway (Express proxy)
db/init/            # Scripts tạo 6 schema và bảng
web/                # Static web demo (nginx)
mobile-app/         # Expo app
docker-compose.yml
```

> Bạn có thể mở rộng web/mobile theo Use Case và thiết kế đã có. Endpoint đã sẵn qua gateway.
