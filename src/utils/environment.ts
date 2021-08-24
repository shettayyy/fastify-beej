export const getEnvironment = (): string => {
  return `Hello World!! - ${JSON.stringify(process.env.NODE_ENV)}`;
};
