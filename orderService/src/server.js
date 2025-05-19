require('dotenv').config();
const express = require('express');
const redis = require('redis');

// Initialize
const app = express();
//const client = redis.createClient({ url: process.env.REDIS_URL });
const client = redis.createClient({ url: "redis://localhost:6379" });

// Middleware
app.use(express.json());

// Connect to Redis
(async () => {
  await client.connect();
  console.log('✅ Connected to Redis');
})();

// Routes
app.post('/orders', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const orderId = Date.now().toString();
  
  await client.hSet(`order:${orderId}`, {
    userId,
    productId,
    quantity,
    status: 'pending'
  });
  
  res.json({ orderId });
});

app.get('/orders/:orderId', async (req, res) => {
  const order = await client.hGetAll(`order:${req.params.orderId}`);
  order ? res.json(order) : res.status(404).send('Order not found');
});

// Start server
app.listen(3002, () => {
  console.log('Order service running on port 3002');
});