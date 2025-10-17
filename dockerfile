# 1. Byggfas
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Serverfas
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]

