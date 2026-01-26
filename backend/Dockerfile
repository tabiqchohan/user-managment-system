FROM node:18-bullseye-slim

WORKDIR /app

# OpenSSL for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install deps
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# 🔥 MOST IMPORTANT LINE
RUN npx prisma generate

# Copy rest of backend code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
