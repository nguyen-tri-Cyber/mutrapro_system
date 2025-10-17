FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --only=production || npm install
COPY src ./src
EXPOSE 5001
CMD ["npm","start"]
