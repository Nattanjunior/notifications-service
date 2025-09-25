FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm install --production

RUN npx prisma generate
RUN npx prisma migrate deploy 

COPY dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]