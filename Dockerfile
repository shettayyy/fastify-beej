#Specify a base image
FROM node:14-alpine

# From compose args
ARG NODE_ENV
ARG PORT

# Set the environment. This can be overridden from docker compose
ENV NODE_ENV=${NODE_ENV}

# Set the root directory
WORKDIR /usr/app

# In case of malicious behavior or because of bugs, a process running with too 
# many privileges may have unexpected consequences on the whole system at runtime.
# Set the system username for the image. Can be renamed to whatever is desired
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

# Copy project manifest files and install the dependencies
COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]
RUN yarn install --silent

# Copy the project files
COPY . .

# Expose the docker port to the local machine
EXPOSE ${PORT}

# Start the fastify application
CMD ["yarn", "start"]
