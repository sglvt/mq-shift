package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/sglv2/rmq-shift/publisher"
)

var port int
var rmqUser, rmqPassword, rmqHost, rmqPort string

func rootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "in progress")
}

func testDataHandler(w http.ResponseWriter, r *http.Request) {
	publisher.GenerateTestData(getRMQConnectionString())
}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", rootHandler)
	router.HandleFunc("/test-data", testDataHandler)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), router))
}

func getIntEnvVar(envVar string) int {
	val, err := strconv.ParseInt(os.Getenv(envVar), 10, 0)
	if err != nil {
		fmt.Printf("Error parsing %v\n", envVar)
		fmt.Println(err)
		os.Exit(1)
	}
	return int(val)
}

func getStringEnvVar(envVar string) string {
	val := os.Getenv(envVar)
	if val == "" {
		fmt.Printf("Empty value for %v\n", envVar)
		os.Exit(1)
	}
	return val
}

func getRMQConnectionString() string {
	return fmt.Sprintf("amqp://%v:%v@%v:%v", rmqUser, rmqPassword, rmqHost, rmqPort)
}

func main() {
	port = getIntEnvVar("RMQ_SHIFT_PORT")
	rmqUser = getStringEnvVar("RMQ_USER")
	rmqPassword = getStringEnvVar("RMQ_PASSWORD")
	rmqHost = getStringEnvVar("RMQ_HOST")
	rmqPort = getStringEnvVar("RMQ_PORT")
	handleRequests()
}
