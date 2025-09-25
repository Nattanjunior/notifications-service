FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm install --production

RUN npx prisma generate

COPY dist/ ./dist/

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/main.js

# CMD ["","node", "dist/main.js"]