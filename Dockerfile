#Specify a base image
FROM node:lts-alpine

# From compose args
ARG NODE_ENV

# Set the environment. This can be overridden from docker compose
ENV NODE_ENV=${NODE_ENV}

# Set the root directory
WORKDIR /usr/app

# Copy project manifest files and install the dependencies
COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]
RUN yarn install --silent

# Copy the project files
COPY . .

# Expose the docker port to the local machine
EXPOSE 3000

# Start the fastify application
CMD ["yarn", "start"]
