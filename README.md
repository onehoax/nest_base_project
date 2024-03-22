# Description

Gannar is a CMS (Content Management System) that allows its clients to create and administer their
own betting house.

# Components

- [Auth Flow](./doc/auth.md)

- [Permissions](./doc/permissions.md)

# Install

Follow [`yarn`](https://yarnpkg.com/getting-started/usage) instructions to install dependencies.

# Run

## Docker Mongo

Navigate to [`./docker/`](./docker/) and run the following:

```bash
> docker compose up -d
```

## Usage

Navigate to `http(s)://<host>:<port>/docs` to access the Swagger UI.
