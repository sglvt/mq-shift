# mq-shift

## Development
### Web app
#### Prerequisites
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
npx create-react-app app
cd app
sudo npm install -g yarn
yarn install
sudo npm install -g yarn
yarn set version latest
yarn add react-router-dom react-select
```

#### Running the app
```
npm start
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
```
docker run -d --name rmq --restart -p 5672:5672 -p 15672:15672 rabbitmq:3.7.0-management

FLASK_APP=api.py \
FLASK_ENV=development \
flask run
```