  FROM node:20-alpine AS builder

  WORKDIR /app
  
  COPY package*.json ./
  
  EXPOSE 3000
  
  CMD ["npm", "run", "start:prod"]
  