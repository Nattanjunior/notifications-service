FROM node:20-alpine

WORKDIR /app

# 1. Copiar apenas package.json para instalar dependências de produção
COPY package*.json ./

# 2. Instalar apenas dependências de produção (mais leve)
RUN npm install --production

# 3. Copiar APENAS a pasta dist (já buildada no CI/CD)
COPY dist/ ./dist/

# 4. Expor a porta
EXPOSE 80

# 5. Comando para executar a aplicação
CMD ["node", "dist/main"]