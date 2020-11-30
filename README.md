# OKR
I'm trying crate OKR system

[Read about okr.](https://en.wikipedia.org/wiki/OKR)

# Workspaces

In this repository there are two worksapces:
* ui - frontend
* api - backend
* shared - shared code. ACL, dto etc

# Shared
cd ./packages/shared
npm run build

# UI
To run the application, run the following commands:

```
cd ./packages/ui
npm run serve
```

# API
To run the application, run the following commands:

```
cd ./packages/api
docker-compose up
npm run start:dev
```

