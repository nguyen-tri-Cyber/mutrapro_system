# MuTraPro System (Monolith-Modules)

## Run Backend
```bash
cd backend
cp .env.example .env   # update DB credentials
npm install
npm run start
# Optional: npm run initdb  (requires DB connection)
```

## Database
- Create DB `MuTraProDB` in SQL Server (via SSMS 19).
- Run `src/scripts/init.sql` in SSMS **or** `npm run initdb`.

## Test Accounts
Register via API:
- ADMIN:    admin@mp.com / 123456  (roleCode: ADMIN)
- CUSTOMER: c1@mp.com   / 123456  (roleCode: CUSTOMER)
- EXPERTS:  t1@mp.com (TRANSCRIBER), m1@mp.com (MIXER), a1@mp.com (ARTIST)

## Frontend Web
Open `frontend-web/index.html` using VS Code Live Server, point to `http://localhost:4000/api`.

## Mobile (Expo)
```bash
cd mobile-app
npm install
npm run start
# Android emulator connects to API via http://10.0.2.2:4000
```


## Docker (optional but recommended for demo)
```bash
cd mutrapro_system
docker compose up --build
# API on http://localhost:4000
# SQL Server on localhost:1433 (sa / YourStrong!Passw0rd)
```
The backend container waits for DB, runs `src/scripts/init.sql` (creating DB `MuTraProDB` if missing), then starts the API.

