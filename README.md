# Serviço de Notificações

Este é um projeto de serviço de notificações construído com [NestJS](https://nestjs.com/).

## Descrição

O objetivo deste projeto é fornecer uma API para gerenciar notificações.

## Instalação

```bash
$ npm install
```

## Executando a aplicação

```bash
# modo de desenvolvimento
$ npm run start:dev

# modo de produção
$ npm run build
$ npm run start:prod
```

## Testes

```bash
# testes unitários/integração
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## API

### Rotas

#### Notificações

- `POST /notifications` - Cria uma nova notificação.

**Request Body:**

```json
{
  "recipientId": "uuid-do-destinatario",
  "content": "Conteúdo da sua notificação.",
  "category": "categoria-da-notificacao"
}
```

**Response (201 - Created):**

```json
{
  "notification": {
    "id": "uuid-da-notificacao",
    "recipientId": "uuid-do-destinatario",
    "content": "Conteúdo da sua notificação.",
    "category": "categoria-da-notificacao",
    "readAt": null,
    "createdAt": "2023-10-27T10:00:00.000Z"
  }
}
```
