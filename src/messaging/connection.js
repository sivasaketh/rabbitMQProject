const amqp = require('amqplib');

let channel = null;

const getChannel = async () => {
  if (channel) return channel;

  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  channel = await connection.createChannel();

  connection.on('close', () => {
    console.error('RabbitMQ connection closed');
    channel = null;
  });

  return channel;
};

module.exports = { getChannel };
