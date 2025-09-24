FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm install --production

RUN npx prisma generate

COPY dist/ ./dist/

EXPOSE 80

CMD ["node", "dist/main.js"]