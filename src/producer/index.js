const express = require('express');
const OrderPublisher = require('../publishers/order-publisher');

const app = express();
app.use(express.json());

const publisher = new OrderPublisher();

app.post('/order', async (req, res) => {
  try {
    await publisher.publish(req.body);
    res.status(200).json({ message: 'Order published', data: req.body });
  } catch (err) {
    console.error('Failed to publish order:', err.message);
    res.status(500).json({ error: 'Failed to publish order' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Producer service running on port ${PORT}`));
