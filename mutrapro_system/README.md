# MuTraPro System (MySQL Monolith-Modules)

## Docker Run
```bash
docker compose up --build
# API: http://localhost:4000
# MySQL: localhost:3306 (user: mutrapro / mutrapro_pwd, db: MuTraProDB)
```
DB is initialized by `db/mysql/init.sql` (mounted to `/docker-entrypoint-initdb.d`).

## Manual Run (without Docker)
1. Start MySQL and run `db/mysql/init.sql`.
2. Backend:
```bash
cd backend
cp .env.example .env   # set DB credentials
npm install
npm run start
```
3. Web: open `frontend-web/index.html` (VS Code Live Server).
4. Mobile (Expo):
```bash
cd mobile-app
npm install
npm run start
```

## Test Accounts
Use /api/auth/register to create:
- ADMIN:    admin@mp.com / 123456  (roleCode: ADMIN)
- CUSTOMER: c1@mp.com   / 123456  (roleCode: CUSTOMER)
- EXPERTS:  t1@mp.com (TRANSCRIBER), m1@mp.com (MIXER), a1@mp.com (ARTIST)
