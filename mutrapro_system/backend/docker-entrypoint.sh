#!/bin/sh
set -e
echo "Waiting for MySQL at ${DB_SERVER}:${DB_PORT:-3306}..."
RETRIES=60
until nc -z ${DB_SERVER} ${DB_PORT:-3306} >/dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "  ... still waiting (${RETRIES})"
  RETRIES=$((RETRIES-1))
  sleep 2
done
echo "Starting API server..."
node src/app.js
