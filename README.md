# OKR
I'm trying crate OKR system

[Read about okr.](https://en.wikipedia.org/wiki/OKR)

# ENV
Api and ui use env variables. Before building projects you should create in the root of each project .env file and fill them with corresponding values from .env.example.

# Workspaces

In this repository there are two worksapces:
* ui - frontend
* api - backend
* shared - shared code. ACL, dto etc

# Shared
Before building other projects run the following commands from the root

```
yarn install
```

# UI
To run the application, run the following commands:

```
cd ./packages/ui
yarn run serve
```

# API
To run the application, run the following commands:

```
cd ./packages/api
docker-compose up
yarn run start:dev
```

# Run all from root
To run all application in dev mod, run the following commands:

```
cd ./packages/api
docker-compose up
cd ../
yarn dev
```

