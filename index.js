// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const redis = require('redis');
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});
client.set('visits', 0);

// Declare a route
fastify.get('/', async (req, res) => {
  client.get('visits', (err, visits) => {
    if (err) return err;

    res.send('Number of visits:' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
