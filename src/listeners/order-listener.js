const BaseListener = require('../messaging/base-listener');

class OrderListener extends BaseListener {
  get queueName() {
    return 'order-queue';
  }

  async onMessage(data, msg) {
    console.log(`[${this.queueName}] Received order:`, data);
    // Process the order here
  }
}

module.exports = OrderListener;
