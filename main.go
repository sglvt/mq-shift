package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/sglv2/mq-shift/publisher"
)

var port int
var mqType, mqProtocol, mqUser, mqPassword, mqHost, mqPort string

func rootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "in progress")
}

func testDataHandler(w http.ResponseWriter, r *http.Request) {
	val := os.Getenv("MQ_TEST_DATA")
	if val == "enabled" {
		if mqType == "rabbitmq" {
			publisher.GenerateRabbitMQTestData(getMQConnectionString())
			fmt.Fprintf(w, "Test data was generated")
		}
	} else {
		fmt.Fprintf(w, "Test data was not generated, set  environment variable MQ_TEST_DATA=enabled")
	}
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

func getMQConnectionString() string {
	return fmt.Sprintf("%v://%v:%v@%v:%v", mqProtocol, mqUser, mqPassword, mqHost, mqPort)
}

func initialize() {
	port = getIntEnvVar("MQ_SHIFT_PORT")
	mqType = getStringEnvVar("MQ_TYPE")
	mqProtocol = getStringEnvVar("MQ_PROTOCOL")
	mqUser = getStringEnvVar("MQ_USER")
	mqPassword = getStringEnvVar("MQ_PASSWORD")
	mqHost = getStringEnvVar("MQ_HOST")
	mqPort = getStringEnvVar("MQ_PORT")
}

func main() {
	initialize()
	handleRequests()
}
