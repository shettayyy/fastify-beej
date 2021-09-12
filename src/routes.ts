import { FastifyInstance } from 'fastify';

export const PREFIX = 'api/v1';

export const routes = (server: FastifyInstance): Promise<void> => {
  server.addHook('preHandler', async (_req, res) => {
    // do something on api routes
    if (res.sent) return false; // stop on error (like user authentication)
  });

  server.get('/', async () => {
    return { hello: 'world' };
  });

  // only for authenticated users with role.
  server.register(async role => {
    role.addHook('preHandler', async (_, res) => {
      // check role for all role routes
      if (res.sent) return false; // stop on error
    });

    role.get('/my_profile', async () => {
      return { hello: 'world' };
    });
  });

  return Promise.resolve();
};
