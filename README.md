# User Service and Notification Service

## Setup
```
cp example.env .env

docker-compose up --build
```

## Ports
- `27017` MongoDB
- `5672` RabbitMQ
- `15672` RabbitMQ GUI
- `3000` User Service

## Volumes
- `.data` MongoDB

## Swagger documentation
[http://localhost:3000/swagger](http://localhost:3000/swagger)

## What to improve?
1. Log level. For now, simple logger with no `LOG_LEVEL` configuration is used.
2. Shared entities. `UserTopics`, `LoggerModule` and `HealthCheckModule` can be moved to shared library.
3. Environment variables validation.
4. User's emails uniqueness. Usually email is unique per collection, the best way to do it is unique index.
