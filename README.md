![Docker Image CI](https://github.com/uudisaru/bus-poller/workflows/Docker%20Image%20CI/badge.svg)

# Bus location poller

The service polls bus locations of Tallinn, Estonia and publishes the information to Redis pub/sub channel.
The service is a part of Docker demo - see (bus-app)[https://github.com/uudisaru/bus-app] for complete application.

# Build commands

- Install dependencies

    ```bash
    $ yarn
    ```

- Launch the dev mode

    ```bash
    $ yarn dev
    ```

- Build

    ```bash
    $ yarn build
    ```

- Build Docker image (see [article for creating Docker build](https://medium.com/trendyol-tech/how-we-reduce-node-docker-image-size-in-3-steps-ff2762b51d5a))

    ```bash
    $ ./build.sh
    ```
