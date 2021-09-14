import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { IS_DEV } from './environment';

// Create a http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
export const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: IS_DEV,
    ignoreTrailingSlash: true,
  });

// TODO: Better off in npm/starcast-server-utils or logging config
export const logError = (error: Error): void => {
  if (IS_DEV) {
    console.error(error);
  }
};
