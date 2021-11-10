from flask import Flask

app = Flask(__name__)


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
    return 'FETCH'