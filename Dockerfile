#Specify a base image
FROM node:14-alpine

# More about dumb init - https://github.com/Yelp/dumb-init
ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Set the environment. This can be overridden from docker compose
ENV NODE_ENV=${NODE_ENV}

# Set the root directory
WORKDIR /usr/app

# Copy project manifest files and install the dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile --silent

# Copy the project files
COPY . .
RUN yarn build

# Expose the docker port to the local machine
EXPOSE ${PORT}

# After you have performed all your tasks as a root user, enable USER namespace on the host
# This is the host configuration which enables to run any container as non-root user on the host
# https://dockerlabs.collabnix.com/security/Running-Containers-as-ROOT.html
USER node

# Without this, we cannot use VSCode's Remote container
# https://github.com/microsoft/vscode-remote-release/issues/174
ENV HOME /home/node/

# Start the fastify application
CMD ["dumb-init", "yarn", "start"]
