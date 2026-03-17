const { getChannel } = require('./connection');

class BaseListener {
  get queueName() {
    throw new Error('queueName getter must be implemented');
  }

  async onMessage(data, msg) {
    throw new Error('onMessage must be implemented');
  }

  async listen() {
    const channel = await getChannel();
    await channel.assertQueue(this.queueName, { durable: true });
    channel.prefetch(1);

    console.log(`[${this.queueName}] Listening for messages...`);

    channel.consume(this.queueName, async (msg) => {
      if (!msg) return;
      const data = JSON.parse(msg.content.toString());
      await this.onMessage(data, msg);
      channel.ack(msg);
    });
  }
}

module.exports = BaseListener;
