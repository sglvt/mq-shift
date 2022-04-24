# mq-shift

React front-end and Python API which enable interracting with a a message queue (only RabbitMQ implemented) in order to view, acknowledge or move messages to another queue.

## Development
### Web app
#### Prerequisites
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g yarn
yarn install
sudo npm install -g yarn
yarn set version latest
yarn add axios \
  create-react-app \
  react-native-keychain \
  react-router-dom \
  react-select \
  react-table
yarn create-react-app web
```

#### Running the app
```
cd web
yarn start
```

### API
#### Dev env
```
cd api
apt install python3.8-venv
python3 -m venv venv
source venv/bin/activate
pip install flask pika urllib3
pip freeze > requirements.txt
```
#### Running the application
Start RabbitMQ
```
docker run -d --name rmq --restart -p 5672:5672 -p 15672:15672 rabbitmq:3.7.0-management
```

Set env vars
```
export MQ_TYPE=rabbitmq
export MQ_USER=guest
export MQ_PASSWORD=guest
export MQ_HOST=127.0.0.1
export MQ_PROTOCOL=amqp
export MQ_PORT=5672
export MQ_API_PROTOCOL=http
export MQ_API_PORT=15672
export FLASK_PORT=8080
```

Start the application
```
FLASK_APP=api.py \
FLASK_ENV=development \
flask run -p ${FLASK_PORT}
```

## Container images
```
podman build -f Dockerfile.web . -t mq-shift-web
podman build -f Dockerfile.api . -t mq-shift-api
```
