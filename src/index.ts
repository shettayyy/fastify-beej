import 'source-map-support/register';
import fastifyBlipp from 'fastify-blipp';
import fastifyHelmet from 'fastify-helmet';
import fastifyFormbody from 'fastify-formbody';
import fastifyCors from 'fastify-cors';
import fastifyCompress from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import fastifyMultipart from 'fastify-multipart';
import fastifyRateLimit from 'fastify-rate-limit';
import FastifyGracefulExit from '@mgcrea/fastify-graceful-exit';

import { routes, PREFIX } from './routes';
import { server, logError } from './config/server';
import startDB from './config/db';

// https://www.npmjs.com/package/helmet
server.register(fastifyHelmet);

// https://www.npmjs.com/package/fastify-formbody
server.register(fastifyFormbody);

// https://github.com/PavelPolyakov/fastify-blipp
server.register(fastifyBlipp);

// https://github.com/fastify/fastify-cors
server.register(fastifyCors);

// https://github.com/fastify/fastify-compress
server.register(fastifyCompress);

// https://github.com/fastify/fastify-cookie
server.register(fastifyCookie);

// https://github.com/fastify/fastify-csrf
server.register(fastifyCsrf, { cookieOpts: { signed: true } });

// https://github.com/fastify/fastify-multipart
server.register(fastifyMultipart);

// https://github.com/fastify/fastify-rate-limit
server.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

// https://github.com/mgcrea/fastify-graceful-exit
server.register(FastifyGracefulExit, { timeout: 3000 });

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
