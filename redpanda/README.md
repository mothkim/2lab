# POC Redpanda

### Require Install
1. Docker
2. kafka command


### Install command kafka on local
```
brew install kafka
```

### Install Docker tools
- Docker : https://docs.docker.com/desktop/setup/install/mac-install/
- Orbstack : https://docs.orbstack.dev/install

### Start RedPanda
```
docker compose up -d
```

### Docker image 2 Container
1. redpandadata/redpanda : is a kafka server
2. redpandadata/console : Admin UI

### Test Create Topic
```
kafka-topics --create --bootstrap-server 0.0.0.0:9092 --topic test-topic
```

### Check Topic Success
1. Open Browser : http://localhost:8080
2. Check Manu Topic
3. When Topic test-topic is already exist, It success.
