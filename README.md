# RabbitMQ Project

A Node.js project demonstrating RabbitMQ messaging with a producer/consumer pattern. The producer exposes an HTTP API to publish order messages, and the consumer listens to the queue and processes them.

## Architecture

```
POST /order  →  Producer (Express)  →  RabbitMQ (order-queue)  →  Consumer
```

- **Producer** — Express server on port 3000 that publishes messages to `order-queue`
- **Consumer** — Standalone process that listens on `order-queue` and processes messages
- **Messaging** — Base publisher/listener classes built on `amqplib`

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [RabbitMQ](https://www.rabbitmq.com/download.html) running locally, or via Docker

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Start RabbitMQ**

Using Docker (easiest):

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

Or install and start RabbitMQ locally following the [official docs](https://www.rabbitmq.com/docs/download).

By default the app connects to `amqp://localhost`. Override with the `RABBITMQ_URL` env var if needed:

```bash
export RABBITMQ_URL=amqp://user:password@localhost:5672
```

## Running

Start the consumer and producer in separate terminals.

**Terminal 1 — Consumer**

```bash
npm run consumer
```

**Terminal 2 — Producer**

```bash
npm run producer
```

The producer starts an Express server on port 3000 (override with `PORT` env var).

## Publishing a Message

Send a POST request to the producer:

```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{"orderId": "123", "item": "widget", "quantity": 2}'
```

The consumer terminal will log the received order:

```
[order-queue] Received order: { orderId: '123', item: 'widget', quantity: 2 }
```

## RabbitMQ Management UI

If you started RabbitMQ with the management plugin (the Docker command above includes it), the UI is available at [http://localhost:15672](http://localhost:15672) (default credentials: `guest` / `guest`).
