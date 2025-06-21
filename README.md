# Serviço de Notificações

Este é um microsserviço de notificações construído com [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/) e [PostgreSQL](https://www.postgresql.org/). O objetivo é fornecer uma API robusta e escalável para criar, gerenciar e consultar notificações.

## Funcionalidades

- Criação de notificações.
- Cancelamento de notificações.
- Leitura e "desleitura" de notificações.
- Contagem de notificações por destinatário.
- Consulta de notificações por destinatário.

## Tecnologias

- **Framework:** NestJS
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Validação:** class-validator
- **Testes:** Jest & ts-jest

---

## Executando o Projeto

Você pode rodar a aplicação localmente usando apenas o `npm` ou de forma containerizada com o `Docker`.

### Usando Docker (Recomendado)

O Docker simplifica o setup, subindo o banco de dados PostgreSQL e a aplicação em containers isolados.

**Pré-requisitos:**
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/notifications-service.git
    cd notifications-service
    ```

2.  **Crie o arquivo `.env`** na raiz do projeto com a URL do banco de dados:
    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notifications-db?schema=public"
    ```

3.  **Suba os containers:**
    ```bash
    docker-compose up -d
    ```
    Este comando irá baixar a imagem do PostgreSQL e iniciar o container do banco de dados em background.

4.  **Instale as dependências e rode as migrações:**
    ```bash
    npm install
    npx prisma migrate dev
    ```

5.  **Inicie a aplicação:**
    ```bash
    npm run start:dev
    ```

A API estará disponível em `http://localhost:3000`.

### Usando NPM (Localmente)

1.  **Instale e execute uma instância do PostgreSQL** localmente.
2.  **Crie um banco de dados** chamado `notifications-db`.
3.  **Crie o arquivo `.env`** conforme o passo 2 do método com Docker.
4.  **Instale as dependências e rode as migrações:**
    ```bash
    npm install
    npx prisma migrate dev
    ```
5.  **Inicie a aplicação:**
    ```bash
    npm run start:dev
    ```

---

## Testes

```bash
# Testes unitários/integração
$ npm run test

# Testes e2e
$ npm run test:e2e

# Cobertura de testes
$ npm run test:cov
```

---

## Documentação da API

### `POST /notifications`

Cria uma nova notificação.

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
    "category": "categoria-da-notificacao"
  }
}
```

---

### `PATCH /notifications/:id/cancel`

Cancela uma notificação específica.

-   `:id` (string) - O ID da notificação a ser cancelada.

**Response (204 No Content)**

---

### `PATCH /notifications/:id/read`

Marca uma notificação específica como lida.

-   `:id` (string) - O ID da notificação.

**Response (204 No Content)**

---

### `PATCH /notifications/:id/unread`

Marca uma notificação específica como não lida.

-   `:id` (string) - O ID da notificação.

**Response (204 No Content)**

---

### `GET /notifications/count/from/:recipientId`

Conta o número de notificações ativas para um destinatário.

-   `:recipientId` (string) - O ID do destinatário.

**Response (200 OK):**
```json
{
  "count": 5
}
```

---

### `GET /notifications/from/:recipientId`

Retorna uma lista de todas as notificações de um destinatário.

-   `:recipientId` (string) - O ID do destinatário.

**Response (200 OK):**
```json
{
  "notifications": [
    {
      "id": "uuid-da-notificacao-1",
      "recipientId": "uuid-do-destinatario",
      "content": "Conteúdo da primeira notificação."
    },
    {
      "id": "uuid-da-notificacao-2",
      "recipientId": "uuid-do-destinatario",
      "content": "Conteúdo da segunda notificação."
    }
  ]
}
```
