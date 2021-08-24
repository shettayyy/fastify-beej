import 'source-map-support/register';

// Require the framework and instantiate it
import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { getEnvironment } from './utils/environment';

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

// Run the server!
const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
