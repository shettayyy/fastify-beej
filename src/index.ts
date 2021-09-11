import 'source-map-support/register';

import { getEnvironment } from './config/environment';
import { server, closeGracefully } from './config/server';
import startDB from './config/db';

// Declare a route
server.get('/', async (_req, res) => {
  res.send(getEnvironment());
});

// Run the server!
const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');

    startDB();

    // Close all the running services gracefully
    process.on('SIGINT', closeGracefully);
    process.on('SIGTERM', closeGracefully);

    // Show the process ID on which the server is running
    console.info(`*^!@4=> Process id: ${process.pid}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
