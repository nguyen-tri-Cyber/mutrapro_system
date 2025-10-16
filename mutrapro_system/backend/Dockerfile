FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --only=production || npm install
COPY src ./src
COPY .env.example .env
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh
EXPOSE 4000
ENTRYPOINT ["/app/docker-entrypoint.sh"]
