import 'source-map-support/register';

// Require the framework and instantiate it
import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { getEnvironment } from './utils/environment';
import startDB from './utils/db';

// Create a http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  });

// Declare a route
server.get('/', async (_req, res) => {
  res.send(getEnvironment());
});

async function closeGracefully(signal: NodeJS.Signals) {
  console.info(`*^!@4=> Received signal to terminate: ${signal}`);

  await server.close();

  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.exit();
}

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
