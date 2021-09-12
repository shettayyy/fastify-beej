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

export async function closeGracefully(signal: NodeJS.Signals): Promise<void> {
  console.info(`*^!@4=> Received signal to terminate: ${signal}`);

  await server.close();

  // TODO: clean the connections gracefully
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.exit();
}

// TODO: Better off in npm/starcast-server-utils or logging config
export const logError = (error: Error): void => {
  if (IS_DEV) {
    console.error(error);
  }
};
