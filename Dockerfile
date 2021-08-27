#Specify a base image
FROM node:14-alpine AS base

# Set the environment. This can be overridden from docker compose
ENV NODE_ENV=${NODE_ENV}

# Set the root directory for the app
WORKDIR /usr/app

# Copy project manifest files and install the dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --only=production --frozen-lockfile --no-progress --silent

# Copy production node_modules aside. We'll be using this for the prod stage
RUN cp -R node_modules prod_node_modules

# Install all dependencies
RUN yarn install --frozen-lockfile --no-progress --silent

# Copy the project files
COPY . .

FROM base AS test
RUN yarn lint

FROM test AS dev
RUN yarn build

# Distroless reduces the security threats by stripping unnecessary commands
# More on distroless https://github.com/GoogleContainerTools/distroless
FROM gcr.io/distroless/nodejs:14-debug

# Set the root directory
WORKDIR /usr/app

# copy production node_modules
COPY --from=base /usr/app/prod_node_modules ./node_modules
COPY --from=base /usr/app/build ./build

# Expose the docker port to the local machine
EXPOSE ${PORT}

# After you have performed all your tasks as a root user, enable USER namespace on the host
# This is the host configuration which enables to run any container as non-root user on the host
# https://dockerlabs.collabnix.com/security/Running-Containers-as-ROOT.html
# Distroless images only support nonroot as USER
USER nonroot

# Without this, we cannot use VSCode's Remote container
# https://github.com/microsoft/vscode-remote-release/issues/174
ENV HOME /home/nonroot/

# Start the fastify application
CMD ["build/index.js"]
