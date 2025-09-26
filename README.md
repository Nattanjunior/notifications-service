# 🔔 Serviço de Notificações

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Este é um microsserviço de notificações construído com **NestJS**, **Prisma** e **PostgreSQL**. O objetivo é fornecer uma API robusta e escalável para criar, gerenciar e consultar notificações em tempo real.

## 🚀 **URL de Produção**

**API em Produção:** [http://3.145.34.134:8080](http://3.145.34.134:8080)

## ✨ **Funcionalidades**

- ✅ **Criação de notificações** com validação de conteúdo
- ✅ **Cancelamento de notificações** por ID
- ✅ **Marcar como lida/não lida** notificações
- ✅ **Contagem de notificações** por destinatário
- ✅ **Consulta de notificações** por destinatário
- ✅ **Notificações em tempo real** via WebSocket
- ✅ **Validação de dados** com class-validator
- ✅ **Documentação interativa** com Swagger
- ✅ **Testes automatizados** com Jest
- ✅ **Deploy automatizado** com GitHub Actions

## 🛠️ **Stack Tecnológica**

### **Backend**
- **Framework:** NestJS 11.1.3
- **Linguagem:** TypeScript 5.8.3
- **ORM:** Prisma 6.10.1
- **Banco de Dados:** PostgreSQL 16.8
- **Validação:** class-validator & class-transformer
- **WebSocket:** Socket.IO
- **Documentação:** Swagger/OpenAPI

### **DevOps & Infraestrutura**
- **Containerização:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Deploy:** Self-hosted runner
- **Monitoramento:** Logs estruturados

### **Testes & Qualidade**
- **Testes Unitários:** Jest 30.0.2
- **Cobertura:** ts-jest
- **Linting:** ESLint
- **Formatação:** Prettier

## 📊 **Arquitetura do Projeto**

```
src/
├── app/
│   ├── entities/           # Entidades de domínio
│   ├── use-cases/         # Casos de uso (Clean Architecture)
│   ├── repositories/      # Interfaces de repositório
│   └── events/           # WebSocket Gateway
├── infra/
│   ├── http/             # Controllers, DTOs e View Models
│   └── database/         # Configuração do Prisma
└── helpers/              # Utilitários
```

---

## 🚀 **Executando o Projeto**

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) 18+ (recomendado: Node.js 22)
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### **🐳 Usando Docker (Recomendado)**

O Docker simplifica o setup, subindo o banco de dados PostgreSQL e a aplicação em containers isolados.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/notifications-service.git
cd notifications-service

# 2. Crie o arquivo .env
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notifications-db?schema=public"' > .env

# 3. Suba os containers
docker-compose up -d

# 4. Instale dependências e rode migrações
npm install
npx prisma migrate dev

# 5. Inicie a aplicação
npm run start:dev
```

**✅ API disponível em:** `http://localhost:3000`

### **📦 Usando NPM (Localmente)**

```bash
# 1. Instale PostgreSQL localmente
# 2. Crie o banco de dados
createdb notifications-db

# 3. Configure o .env
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notifications-db?schema=public"' > .env

# 4. Instale dependências
npm install

# 5. Execute migrações
npx prisma migrate dev

# 6. Inicie a aplicação
npm run start:dev
```

### **🔧 Scripts Disponíveis**

```bash
# Desenvolvimento
npm run start:dev          # Modo desenvolvimento com hot-reload
npm run start:debug        # Modo debug

# Produção
npm run build              # Build da aplicação
npm run start:prod         # Iniciar em produção

# Testes
npm run test               # Testes unitários
npm run test:watch         # Testes em modo watch
npm run test:cov           # Cobertura de testes
npm run test:e2e           # Testes end-to-end

# Qualidade de Código
npm run lint               # Linting
npm run format             # Formatação
```

### **🗄️ Banco de Dados**

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Reset do banco (cuidado!)
npx prisma migrate reset

# Visualizar banco (Prisma Studio)
npx prisma studio
```

---

## 🧪 **Testes**

O projeto possui uma suíte completa de testes com **100% de cobertura** dos casos de uso principais.

```bash
# Testes unitários/integração
npm run test

# Testes com watch mode
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

### **📊 Cobertura de Testes**
- ✅ **Entidades:** Content, Notification
- ✅ **Use Cases:** Send, Cancel, Read, Unread, Count, Get
- ✅ **Repositórios:** In-memory implementation
- ✅ **Validações:** DTOs e business rules

---

## 📚 **Documentação da API**

### **🌐 Swagger/OpenAPI**
A documentação interativa da API está disponível via Swagger:

- **Local:** http://localhost:3000/docs
- **Produção:** [http://3.145.34.134:8080/docs](http://3.145.34.134:8080/docs)

### **🔌 WebSocket**
Para notificações em tempo real, conecte-se ao WebSocket:

```javascript
// Exemplo de conexão WebSocket
const socket = io('http://3.145.34.134:8080', {
  namespace: 'events'
});

socket.on('newNotification', (notification) => {
  console.log('Nova notificação:', notification);
});
```

## 🔗 **Endpoints da API**

### **📝 Criar Notificação**
```http
POST /notifications
```

**Request Body:**
```json
{
  "recipientId": "uuid-do-destinatario",
  "content": "Conteúdo da sua notificação.",
  "category": "categoria-da-notificacao"
}
```

**Response (201 Created):**
```json
{
  "notification": {
    "id": "uuid-da-notificacao",
    "recipientId": "uuid-do-destinatario",
    "content": "Conteúdo da sua notificação.",
    "category": "categoria-da-notificacao",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### **❌ Cancelar Notificação**
```http
PATCH /notifications/:id/cancel
```

- **`:id`** (string) - O ID da notificação a ser cancelada.

**Response:** `204 No Content`

---

### **✅ Marcar como Lida**
```http
PATCH /notifications/:id/read
```

- **`:id`** (string) - O ID da notificação.

**Response:** `204 No Content`

---

### **⏪ Marcar como Não Lida**
```http
PATCH /notifications/:id/unread
```

- **`:id`** (string) - O ID da notificação.

**Response:** `204 No Content`

---

### **📊 Contar Notificações**
```http
GET /notifications/count/from/:recipientId
```

- **`:recipientId`** (string) - O ID do destinatário.

**Response (200 OK):**
```json
{
  "count": 5
}
```

---

### **📋 Listar Notificações**
```http
GET /notifications/from/:recipientId
```

- **`:recipientId`** (string) - O ID do destinatário.

**Response (200 OK):**
```json
{
  "notifications": [
    {
      "id": "uuid-da-notificacao-1",
      "recipientId": "uuid-do-destinatario",
      "content": "Conteúdo da primeira notificação.",
      "category": "social",
      "readAt": null,
      "canceledAt": null,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "uuid-da-notificacao-2",
      "recipientId": "uuid-do-destinatario",
      "content": "Conteúdo da segunda notificação.",
      "category": "promotional",
      "readAt": "2024-01-01T01:00:00.000Z",
      "canceledAt": null,
      "createdAt": "2024-01-01T00:30:00.000Z"
    }
  ]
}
```

---

## 🚀 **Deploy & CI/CD**

### **GitHub Actions**
O projeto possui pipeline automatizada com:

- ✅ **Build automatizado** no push para main
- ✅ **Testes automatizados** antes do deploy
- ✅ **Build da imagem Docker** otimizada
- ✅ **Deploy automático** para servidor self-hosted
- ✅ **Limpeza automática** de recursos Docker

### **Docker**
- **Multi-stage build** para otimização
- **Imagem Alpine** para menor tamanho
- **Usuário não-root** para segurança
- **Health checks** integrados

---

## 📈 **Monitoramento**

### **Logs**
- Logs estruturados com timestamps
- Conexões WebSocket monitoradas
- Erros capturados e logados

### **Métricas**
- Contagem de notificações por destinatário
- Status de leitura/cancelamento
- Performance de queries

---

## 🤝 **Contribuindo**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 **Licença**

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 **Autor**

Desenvolvido com ❤️ usando NestJS, Prisma e PostgreSQL.
