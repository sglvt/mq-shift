from flask import Flask, jsonify, request
import json
import os
import pika
import traceback
import urllib3

SUPPORTED_MQ_TYPES = {
    "RABBITMQ": "rabbitmq"
}

def init():
    global port, mqUser, mqPassword, mqHost, mqPort, mqApiPort, mqProtocol, mqApiProtocol
    mqType = os.environ.get("MQ_TYPE").lower()
    mqUser = os.environ.get("MQ_USER")
    mqPassword = os.environ.get("MQ_PASSWORD")
    mqHost = os.environ.get("MQ_HOST")
    mqProtocol = os.environ.get("MQ_PROTOCOL")
    mqPort = os.environ.get("MQ_PORT")
    mqApiProtocol = os.environ.get("MQ_API_PROTOCOL")
    mqApiPort = os.environ.get("MQ_API_PORT")
    if not (mqType in SUPPORTED_MQ_TYPES.values()):
        print(f'{mqType} is not supported')

try:
    init()
    app = Flask(__name__)
    http = urllib3.PoolManager()
    headers = urllib3.util.make_headers(basic_auth=f'{mqUser}:{mqPassword}')
except:
    traceback.print_exc()
    exit(1)

@app.route('/')
def root():
    return '''
    <table>
    <tr><td>/</td></tr>
    <tr><td>/fetch</td></tr>
    </table>
    '''

@app.route('/queue-list')
def queueList():
    resp = http.request('GET', f'{mqApiProtocol}://{mqHost}:{mqApiPort}/api/queues',headers=headers)
    queue_list = []
    data = json.loads(resp.data)
    for i in range(len(data)):
        queue={}
        queue['name'] = data[i]['name']
        queue['durable'] = str(data[i]['durable'])
        queue_list.append(queue)
    print(queue_list)
    return jsonify(queue_list)

@app.route('/insert-message', methods=['POST'])
def insertMessage():
    data = request.form['message']
    queueName = request.form['queueName']
    durable = request.form['durable']
    credentials = pika.PlainCredentials(mqUser, mqPassword)
    parameters = pika.ConnectionParameters(host=mqHost,
                                        port=mqPort,
                                        virtual_host='/',
                                        credentials=credentials)
    connection = pika.BlockingConnection(parameters=parameters)

    channel = connection.channel()
    channel.queue_declare(queue=queueName, durable=durable)
    channel.basic_publish(exchange='',
                      routing_key=queueName,
                      body=data)
    connection.close()
    return data

@app.route('/get-messages', methods=['POST'])
def getMessages():
    queueName = request.form['queueName']
    durable = request.form['durable']
    desiredCount = int(request.form['count'])
    acknowledge = request.form['acknowledge'] == 'True'
    print(f'queueName={queueName} durable={durable} count={desiredCount} acknowledge={acknowledge}')
    credentials = pika.PlainCredentials(mqUser, mqPassword)
    parameters = pika.ConnectionParameters(host=mqHost,
                                        port=mqPort,
                                        virtual_host='/',
                                        credentials=credentials)
    connection = pika.BlockingConnection(parameters=parameters)

    channel = connection.channel()
    queue = channel.queue_declare(queue=queueName, durable=durable)
    data = []
    currentCount = 0
    if queue.method.message_count > 0:
        for method_frame, properties, body in channel.consume(queue=queueName):

            # Display the message parts
            print(method_frame)
            print(properties)
            print(body)
            data.append(body.decode("utf-8") )
            # Acknowledge the message
            if (acknowledge):
                channel.basic_ack(method_frame.delivery_tag)
            currentCount+=1
            # Escape out of the loop after 1 messages
            if currentCount >= desiredCount:
                break

            # If queue is empty
            print(f'queue.method.message_count={queue.method.message_count}')
            if queue.method.message_count == currentCount:
                break

    # Cancel the consumer and return any pending messages
    requeued_messages = channel.cancel()
    print('Requeued %i messages' % requeued_messages)

    # Close the channel and the connection
    channel.close()
    connection.close()
    # jsonified_data=jsonify({'data': data})
    jsonified_data=jsonify(data)
    print(f'jsonified_data={jsonified_data}')
    return jsonified_data


@app.route('/move-messages', methods=['POST'])
def moveMessages():
    sourceQueueName = request.form['sourceQueueName']
    destQueueName = request.form['destQueueName']
    durable = request.form['durable']
    desiredCount = int(request.form['count'])
    acknowledge = request.form['acknowledge'] == 'True'
    print(f'queueName={sourceQueueName} durable={durable} count={desiredCount} acknowledge={acknowledge}')
    credentials = pika.PlainCredentials(mqUser, mqPassword)
    parameters = pika.ConnectionParameters(host=mqHost,
                                        port=mqPort,
                                        virtual_host='/',
                                        credentials=credentials)
    connection = pika.BlockingConnection(parameters=parameters)

    channel = connection.channel()
    sourceQueue = channel.queue_declare(queue=sourceQueueName, durable=durable)
    data = []
    currentCount = 0
    if sourceQueue.method.message_count > 0:
        for method_frame, properties, body in channel.consume(queue=sourceQueueName):

            # Display the message parts
            print(method_frame)
            print(properties)
            print(body)
            channel.basic_publish(exchange='',
                    routing_key=destQueueName,
                    body=body)
            data.append(body.decode("utf-8") )
            # Acknowledge the message
            if (acknowledge):
                channel.basic_ack(method_frame.delivery_tag)
            currentCount+=1
            # Escape out of the loop after 1 messages
            if currentCount >= desiredCount:
                break

            # If queue is empty
            print(f'queue.method.message_count={sourceQueue.method.message_count}')
            if sourceQueue.method.message_count == currentCount:
                break

    # Cancel the consumer and return any pending messages
    requeued_messages = channel.cancel()
    print('Requeued %i messages' % requeued_messages)

    # Close the channel and the connection
    channel.close()
    connection.close()
    # jsonified_data=jsonify({'data': data})
    jsonified_data=jsonify(data)
    print(f'jsonified_data={jsonified_data}')
    return jsonified_data

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000" # 
    return response