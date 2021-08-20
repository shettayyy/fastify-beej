# fastify-beej

A boilerplate to create GraphQL APIs using fastify

## Add Shields

Coming soon - Shields/badges from shields.io

## Getting Started

- [Usage](#usage)
- [Tools and Libraries](#tools-and-libraries)
- [Path resolver](#path-resolver)
- [Global Types](#global-types)
- [Debugging](#debugging)
- [Linting](#linting)
- [Release History](#release-history)
- [Contributing](#contributing)
- [Author](#author)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

## Usage

## Tools and Libraries

## Path resolver

## Global types

## Debugging

## Linting

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

## Release History

- Coming soon

## Contributing

Fastify Beej welcomes contributions to our open source project. When contributing, please follow the [Contributing](https://github.com/rashtay/React_Native_Seed/blob/main/CONTRIBUTING.md) guide.

## Author

- [Rahul Shetty](https://github.com/rashtay)

## FAQ

If you run into any issues, go through the [F.A.Q.](https://github.com/rashtay/React_Native_Seed/blob/main/FAQ.md) file. Amongst other things, this document contains information about common issues.

## Support

- If any information is missing from the [README](https://github.com/rashtay/React_Native_Seed/blob/main/README.md) file, want to raise a feature request or report any bug, please create a new [issue](https://github.com/rashtay/React_Native_Seed/issues) with appropriate labels.

## License

For licensing information, go through [License](https://github.com/rashtay/React_Native_Seed/blob/main/LICENSE) file.
