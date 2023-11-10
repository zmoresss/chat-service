# Prerequisites

## Keycloak
_This feature is used for authenticating user._

1. Start keycloak from docker
```agsl
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:21.1.2 start-dev
```

2. Access `https://localhost:8080` and login your account
3. Create your realm to use on your project (See: [Keycloak](https://www.keycloak.org/getting-started/getting-started-docker))

## MongoDB
_This feature is used for storing the chat records_

1. Install MongoDB Docker image
```agsl
docker pull mongodb/mongodb-community-server
```

2. Run the docker container
```agsl
docker run --name mongo -d mongodb/mongodb-community-server:latest
```

3. Connect to the MongoDB Deployment with mongosh
```agsl
docker exec -it mongo mongosh
```

---

# Running Project with Docker

## Build / Rebuild
```agsl
docker build -t zsa-chat-service .
```

## Run
```agsl
docker run -it -p 9000:9000 zsa-chat-service
```

## Kill docker process (optional)
_Run this command if you cannot stop/kill the project process._

1. Get list of docker processes: `docker ps`
2. Get container ID of the project
3. Run to kill: `docker kill <container-ID>`