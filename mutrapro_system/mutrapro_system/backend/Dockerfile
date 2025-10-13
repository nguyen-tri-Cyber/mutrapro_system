FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --only=production || npm install

COPY src ./src
COPY .env.example .env

# Entrypoint waits for DB then runs init + starts API
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 4000
ENTRYPOINT ["/app/docker-entrypoint.sh"]
