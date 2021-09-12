import 'source-map-support/register';
import fastifyBlipp from 'fastify-blipp';
import fastifyHelmet from 'fastify-helmet';
import fastifyFormbody from 'fastify-formbody';
import fastifyCors from 'fastify-cors';

import { routes, PREFIX } from './routes';
import { server, closeGracefully, logError } from './config/server';
import startDB from './config/db';

// https://www.npmjs.com/package/helmet
server.register(fastifyHelmet);

// https://www.npmjs.com/package/fastify-formbody
server.register(fastifyFormbody);

// https://github.com/PavelPolyakov/fastify-blipp
server.register(fastifyBlipp);

// https://github.com/fastify/fastify-cors
server.register(fastifyCors);

// Register all routes
server.register(routes, {
  prefix: PREFIX,
});

// Run the server!
const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');

    startDB();
    server.blipp();

    // Close all the running services gracefully
    process.on('SIGINT', closeGracefully);
    process.on('SIGTERM', closeGracefully);
    process.on('uncaughtException', logError);
    process.on('unhandledRejection', logError);

    // Show the process ID on which the server is running
    console.info(`*^!@4=> Process id: ${process.pid}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
