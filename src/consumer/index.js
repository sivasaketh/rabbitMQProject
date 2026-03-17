const OrderListener = require('../listeners/order-listener');

const listener = new OrderListener();

listener.listen().catch((err) => {
  console.error('Consumer failed to start:', err.message);
  process.exit(1);
});
