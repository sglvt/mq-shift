package publisher

import (
	"fmt"
	"log"
	"time"

	"github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func GenerateRabbitMQTestData(connection string) {
	conn, err := amqp.Dial(connection)
	failOnError(err, fmt.Sprintf("connection.open source: %s", connection))
	defer conn.Close()

	c, err := conn.Channel()
	if err != nil {
		log.Fatalf("channel.open: %s", err)
	}

	err = c.ExchangeDeclare("logs", "direct", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("exchange.declare: %v", err)
	}

	if _, err := c.QueueDeclare("remote-tee", true, true, false, false, nil); err != nil {
		log.Fatalf("queue.declare source: %s", err)
	}

	if err := c.QueueBind("remote-tee", "#", "logs", false, nil); err != nil {
		log.Fatalf("queue.bind source: %s", err)
	}
	msg := amqp.Publishing{
		DeliveryMode: amqp.Persistent,
		Timestamp:    time.Now(),
		ContentType:  "text/plain",
		Body:         []byte("Go Go AMQP!"),
	}

	err = c.Publish("logs", "info", false, false, msg)
	if err != nil {
		// Since publish is asynchronous this can happen if the network connection
		// is reset or if the server has run out of resources.
		log.Fatalf("basic.publish: %v", err)
	}

	// mq, err := rabbitmq.NewMQ(connection)
	// failOnError(err, fmt.Sprintf("%v", err))
	// defer mq.Close()

	// _, err = mq.QueueDeclare(rabbitmq.NewQueueOptions().SetName("hello"))
	// failOnError(err, fmt.Sprintf("%v", err))

	// var wg sync.WaitGroup
	// max := 10
	// wg.Add(max)
	// for i := 0; i < max; i++ {
	// 	go func(a int) {
	// 		defer wg.Done()
	// 		body := fmt.Sprintf("Hello World %d !", a)
	// 		err = mq.Publish(&rabbitmq.MQConfigPublish{
	// 			RoutingKey: mq.Queue().Name,
	// 			Message: amqp.Publishing{
	// 				ContentType: "text/plain",
	// 				Body:        []byte(body),
	// 			},
	// 		})
	// 	}(i)
	// }
	// wg.Wait()
}
