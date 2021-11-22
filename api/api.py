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
    connection = pika.BlockingConnection(pika.ConnectionParameters(mqHost))

    channel = connection.channel()
    channel.queue_declare(queue=queueName, durable=True)
    channel.basic_publish(exchange='',
                      routing_key=queueName,
                      body=data)
    connection.close()
    return data

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*" # http://localhost
    return response