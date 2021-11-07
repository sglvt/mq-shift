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
export MQ_SHIFT_PORT=8080
export MQ_PROTOCOL='amqp'
export MQ_USER=guest
export MQ_PASSWORD=guest
export MQ_HOST=127.0.0.1
export MQ_PORT=5672
```

```
go run main.go
```
