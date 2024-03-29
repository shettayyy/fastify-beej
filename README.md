# fastify-beej

A boilerplate to create GraphQL APIs using fastify

## Add Shields

Coming soon - Shields/badges from shields.io

## Getting Started

- [Usage](#usage)
- [Tools and Libraries](#tools-and-libraries)
- [Debugging](#debugging)
- [Code Quality](#code-quality)
- [Release History](#release-history)
- [Contributing](#contributing)
- [Author](#author)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

## Usage

- Install [Docker Desktop](https://www.docker.com/get-started) for your respective operating system.
- Enable Kubernetes by referring to the guide available in the link below:
  <https://docs.docker.com/desktop/kubernetes/>
- I, highly, recommend using [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) for installing the LTS version of Node.js v14. If you do not want to use [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md), install the latest [LTS version of Node.js - v14](https://nodejs.org/en/about/releases/). Installing Node.js isn't necessary if you'd be using Docker.
- Clone the repository `git clone https://github.com/rashtay/fastify-beej.git <your-project-name>`
- Change the `name` in _package.json_ and service names in docker config files.
- Create a folder named `.mongodb_data`. Inside `.mongodb_data`, create another folder named `mongodb_config`. `.mongo_data` saves all your MongoDB data in the host machine. If you have to clear all your docker data and start from scratch, you'll not lose your development data with this approach. if you would like to share your data across the team then, remove `.mongodb_data` from `.gitignore` file but make sure your team uses the same user name and password for the database.
- Add appropriate license for your project
- Change the markdown files as per your preference
- To start the development server using Docker, run `yarn docker:build-dev` to build and run the container else you can use `yarn:run-dev` to run an existing container which has already been built
- To start the development server locally without Docker, run `yarn start:dev`. Please not that the local or test database URL would be required to run the project locally.
- To start the production server locally using docker, run `yarn docker:build` to build and run the container else you can use `yarn:run` to run an existing container which has already been built
- To start the production server locally without Docker, run `yarn build` and `yarn start`. Please note that you should never code in this environment. Start the production server only for testing. Please not that the local or test database URL would be required to run the project locally.

## Tools and Libraries

- [Node.js](https://nodejs.org/en/about/) is designed to build scalable network applications
- [Fastify and it's ecosystem](https://www.fastify.io/) is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. Check the `src/index.ts` file for all the helpful plugins we have registered
- [Typescript](https://www.typescriptlang.org/) for type checking and then compiling the code to plain/vanilla JavaScript
- [Husky](https://www.npmjs.com/package/husky) to add precommit and prepush hooks
- [Lint Staged](https://www.npmjs.com/package/lint-staged) to lint the currently modified file
- [Prettier](https://prettier.io/) configured for formatting

## Debugging

- [Node isnpector has been enabled for debugging](https://nodejs.org/api/inspector.html)
- [VSCode settings has been added (under .vscode) for debugging the nodejs instance running in the docker container](https://www.bigbinary.com/blog/debug-nodejs-app-running-in-a-docker-container)

## Code Quality

The project comes preconfigured with `eslint` and `prettier` . I've added support for `typescript` linting. I have listed the additional packages being used for linting:

- eslint-plugin-standard
- eslint-plugin-import
- eslint-config-prettier

The eslint, prettier and typescript configuration files have been updated to accomodate the additional plugins.

I have made sure you cannot push the code if there are any lint or [type related](https://github.com/okonet/lint-staged/issues/468#issuecomment-605102567) issues.

## Project Structure

If you are inquisitive, [click the link to know more about the current project structure](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)

## Docker Commands

- `docker ps`: List all running containers. If you add the flag `-all`, it will show you all the containers at halt.
- `docker create <image name>`: Using docker, try to create a container with name of the image.
- `docker start <container ID>`: Start the created container with the created container ID. If you add the flag `-a` makes the docker watch for outputs coming from the container and print it out.
- `docker build -t <your-docker-id>/<name-of-your-project> .`: This tags our docker build so that we don't have to remember/copy-paste the name of the conatiner ID. Notice, the naming convention for the tags. The placeholders are self-ecplanatory. The `.` at the end is the filepath
- `docker run <image-name>`: Runs a container. You can map the ports by passing `-p <application running on port in docker e.g 8080>:<free port on your machine e.g 8080>`
- `docker system prune`: Removes all the halted containers. Helps with clearing the space
- `docker logs <container-id>`: Show all the logs emitted by the container
- `docker stop <container-id>`: A `SIGTERM` (terminate signal) message is sent to the container saying stop the container gracefully. If the process doesn't shut down in 10 seconds gracefully, then `SIGKILL` (kill the process signal) message is sent to the container to stop.
- `docker kill <container-id>`: A `SIGKILL` (kill the process signal) message is sent to the container to stop the container.
- `docker exec -it <container id> <command>`: Executes your commands in the container. The `-i` flag attaches our terminal to the `STDIN` channel of the container. The `-t` flag formats the input and output for us.
- `docker exec -it <container id> sh`: Opens the termnal within the container.
- `docker-compose -f docker-compose.dev.yml up`: Run docker compose to build the container. By default, docker compose checks for a _docker-compose.yml_ config file. `-f` flag can be used to provide a different docker compose config file.
- `docker-compose -f docker-compose.dev.yml up -d`: `-d` flag runs the container in the background.
- `docker-compose -f docker-compose.dev.yml up --build`: Builds the container and runs it. Use `-d` to run the container in the background.
- `docker-compose down --remove-orphans`: Stop the running container and discard all the connections.
- `docker system prune -af --volumes && docker builder prune`: Remove all the volumes, builders and cached containers.
- `docker-compose -f docker-compose.dev.yml config`: Replaces the variables used in the config files with the actual values and prints it to the terminal
- `docker system df`: Show docker disk usage on the host machine. Add `-v` for a detailed output.
- `docker images`: To see a list of images we have on our local machine

## Release History

- Coming soon

## Contributing

Fastify Beej welcomes contributions to our open source project. When contributing, please follow the [Contributing](https://github.com/rashtay/fastify-beej/blob/main/CONTRIBUTING.md) guide.

## Author

- [Rahul Shetty](https://github.com/rashtay)

## FAQ

If you run into any issues, go through the [F.A.Q.](https://github.com/rashtay/fastify-beej/blob/main/FAQ.md) file. Amongst other things, this document contains information about common issues.

## Support

- If any information is missing from the [README](https://github.com/rashtay/fastify-beej/blob/main/README.md) file, want to raise a feature request or report any bug, please create a new [issue](https://github.com/rashtay/fastify-beej/issues) with appropriate labels.

## License

For licensing information, go through [License](https://github.com/rashtay/fastify-beej/blob/main/LICENSE) file.
