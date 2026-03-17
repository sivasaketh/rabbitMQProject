const BasePublisher = require('../messaging/base-publisher');

class OrderPublisher extends BasePublisher {
  get queueName() {
    return 'order-queue';
  }
}

module.exports = OrderPublisher;
