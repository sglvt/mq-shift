# rmq-shift

```
go mod init
go mod tidy
```

# Start local RabbitMQ
```
docker run -d -p 5672:5672 -p 15672:15672 --name rmq docker.io/rabbitmq
```

```
export RMQ_SHIFT_PORT=8080
export RMQ_PORT=5672
export RMQ_USER=guest
export RMQ_PASSWORD=guest
export RMQ_HOST=127.0.0.1
export RMQ_PORT=5672
```

```
go run main.go
```
