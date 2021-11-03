package publisher

import (
	"fmt"
	"log"
	"sync"

	rabbitmq "github.com/hadihammurabi/go-rabbitmq"
	"github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func GenerateData(connection string) {
	mq, err := rabbitmq.NewMQ(connection)
	failOnError(err, fmt.Sprintf("%v", err))
	defer mq.Close()

	_, err = mq.QueueDeclare(rabbitmq.NewQueueOptions().SetName("hello"))
	failOnError(err, fmt.Sprintf("%v", err))

	var wg sync.WaitGroup
	max := 10
	wg.Add(max)
	for i := 0; i < max; i++ {
		go func(a int) {
			defer wg.Done()
			body := fmt.Sprintf("Hello World %d !", a)
			err = mq.Publish(&rabbitmq.MQConfigPublish{
				RoutingKey: mq.Queue().Name,
				Message: amqp.Publishing{
					ContentType: "text/plain",
					Body:        []byte(body),
				},
			})
		}(i)
	}
	wg.Wait()
}
