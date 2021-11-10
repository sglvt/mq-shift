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
pip install flask pika
pip freeze > requirements.txt
```
#### Running the application
```
FLASK_APP=api.py \
FLASK_ENV=development \
flask run
```