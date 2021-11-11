from flask import Flask
import json
import urllib3

app = Flask(__name__)
http = urllib3.PoolManager()
headers = urllib3.util.make_headers(basic_auth='guest:guest')

@app.route('/')
def root():
    return '''
    <table>
    <tr><td>/</td></tr>
    <tr><td>/fetch</td></tr>
    </table>
    '''

@app.route('/fetch')
def fetch():
    resp = http.request('GET', 'http://127.0.0.1:15672/api/queues',headers=headers)
    queue_list = []
    data = json.loads(resp.data)
    print("skeptical")
    print(data)
    for i in range(len(data)):
        queue_list.append(data[i]['name'])
    print(queue_list)
    return json.dumps(queue_list)