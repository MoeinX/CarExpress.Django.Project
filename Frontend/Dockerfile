FROM node:18-alpine

WORKDIR /app

# ابتدا فایل‌های پکیج کپی می‌شوند
COPY package*.json ./

# نصب تمامی پکیج‌ها (شامل react-scripts یا vite)
RUN npm install

# کپی باقی‌مانده کدهای پروژه
COPY . .

EXPOSE 3000

CMD ["npm", "start"]