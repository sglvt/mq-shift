package main

import "github.com/sglv2/rmq-shift/publisher"

// this is an example of publising message directly into queue
// steps to do here are same as https://www.rabbitmq.com/tutorials/tutorial-one-go.html
// but using the wrapper API

func main() {
	publisher.GenerateData()
}
