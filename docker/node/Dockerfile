FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat

# ก๊อปปี้ไฟล์โครงสร้างโปรเจกต์ที่เพิ่งสร้างเข้ามา
COPY frontend/package*.json ./

# ติดตั้ง Dependencies ทั้งหมดของ Next.js ให้สมบูรณ์ภายใน Container
RUN npm install

COPY frontend/ .

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

# รัน Next.js ใน Development Mode พร้อมHot-reloading
CMD ["npm", "run", "dev"]
