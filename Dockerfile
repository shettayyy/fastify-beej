#Specify a base image
FROM node:14-alpine

# Set the environment. This can be overridden from docker compose
ENV NODE_ENV=production

# Set the root directory
WORKDIR /usr/app

# Copy project manifest files and install the dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent

# Copy the project files
COPY . .

# Expose the docker port to the local machine
EXPOSE 3000

# Provide necessary permission to our app folder
RUN chown -R node /usr/app

# Set the system username for the image. Can be renamed to whatever is desired
USER node

# Start the fastify application
CMD ["yarn", "start"]