#Specify a base image
FROM node:14-alpine

# In case of malicious behavior or because of bugs, a process running with too 
# many privileges may have unexpected consequences on the whole system at runtime.
# Set the system username for the image. Can be renamed to whatever is desired
RUN addgroup -S nodejs && adduser -S node -G nodejs

# Set the environment. This can be overridden from docker compose
ENV NODE_ENV=${NODE_ENV}

# Set the root directory
WORKDIR /usr/app

# Copy project manifest files and install the dependencies
COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]
RUN rm -rf node_modules build && yarn install --frozen-lockfile --silent

# Copy the project files
COPY . .

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
CMD ["yarn", "start"]
