export const DEVELOPMENT = 'development';

export const { NODE_ENV } = process.env;

export const getEnvironment = (): string => {
  return `Hello World!! - ${JSON.stringify(NODE_ENV)}`;
};
