#!/bin/sh
set -e

echo "Using DB_SERVER=${DB_SERVER}, DB_DATABASE=${DB_DATABASE}"

# wait for db port
echo "Waiting for SQL Server at ${DB_SERVER}:${DB_PORT:-1433}..."
RETRIES=60
until nc -z ${DB_SERVER} ${DB_PORT:-1433} >/dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "  ... still waiting (${RETRIES})"
  RETRIES=$((RETRIES-1))
  sleep 2
done

echo "Running init SQL (this will create DB/tables if missing)..."
# Try init a few times in case DB is still warming up
for i in 1 2 3 4 5; do
  node src/scripts/runInitSql.js && break || echo "Init try $i failed, retrying..." && sleep 3
done

echo "Starting API server..."
node src/app.js
