const { getChannel } = require('./connection');

class BasePublisher {
  get queueName() {
    throw new Error('queueName getter must be implemented');
  }

  async publish(data) {
    const channel = await getChannel();
    await channel.assertQueue(this.queueName, { durable: true });
    channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
    console.log(`[${this.queueName}] Published:`, data);
  }
}

module.exports = BasePublisher;
