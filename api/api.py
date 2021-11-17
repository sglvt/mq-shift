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
        queue_list.append(data[i]['name'])
    print(queue_list)
    return jsonify(queue_list)

@app.route('/insert-message', methods=['POST'])
def insertMessage():
    # data = request['message']
    print(request.form['message'])
    # credentials = pika.PlainCredentials(mqUser, mqPassword)
    # parameters = pika.ConnectionParameters('rabbit-server1',
    #                                     mqPort,
    #                                     '/',
    #                                     credentials)
    # connection = pika.BlockingConnection(pika.ConnectionParameters(mqHost))

    # channel = connection.channel()
    # channel.queue_bind(queue='q1', exchange='amq.direct')
    # channel.basic_publish(exchange='amq.direct',
    #                   routing_key='q1',
    #                   body=jsonify(data))
    # connection.close()
    # return jsonify(data)
    return 'OK'

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*" # http://localhost
    return response