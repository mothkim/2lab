# Install&Run Redpanda with Docker

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

---

# Install&Run RedPanda Systemd

1. Install Redpanda
```
curl -1sLf 'https://dl.redpanda.com/nzc4ZYQK3WRGd9sy/redpanda/cfg/setup/bash.deb.sh' | \
sudo -E bash && sudo apt install redpanda -y
```

```
running the following:

    sudo rpk redpanda mode production

followed by:

    sudo rpk redpanda tune all
    sudo systemctl start redpanda
```

2. Install redpanda-fips redpanda-rpk-fips

```
apt install redpanda-fips redpanda-rpk-fips
```

# Follow Command for Production
```
running the following:

    sudo rpk redpanda mode production

followed by:

    sudo rpk redpanda tune all
    sudo systemctl start redpanda
```

# Description
'''
To install Redpanda for FIPS compliance, install the packages redpanda-fips and redpanda-rpk-fips, which automatically pull in all required dependencies.

redpanda-fips

Contains the OpenSSL FIPS-approved module and scripts required to set up and run Redpanda in FIPS-compliance mode.

Depends upon the successful installation of the redpanda package.

Includes the fips.so cryptographic provider (built from OpenSSL v3.0.9, which is the latest FIPS 140-2 approved module) and a copy of the OpenSSL application.

Executes openssl fipsinstall against the fips.so module, which generates a fipsmodule.cnf file that is used during the module’s POST (power-on-self-test) to validate the integrity of the module.

redpanda-rpk-fips

Contains a version of rpk built with the Microsoft GoLang compiler and Microsoft’s Go Crypto OpenSSL package to which rpk is linked, and uses the FIPS-approved version of OpenSSL.
'''

3. Install RedPanda Console(UI)
```
curl -1sLf 'https://dl.redpanda.com/nzc4ZYQK3WRGd9sy/redpanda/cfg/setup/bash.deb.sh' | \
sudo -E bash && sudo apt-get install redpanda-console -y
```

4. Config
```
sudo rpk redpanda config bootstrap --self <listener-address> --advertised-kafka <advertised-kafka-address> --ips <seed-server1-ip>,<seed-server2-ip>,<seed-server3-ip> && \
sudo rpk redpanda config set redpanda.empty_seed_starts_cluster false
```

5. Bootstrapping Redpanda updates your /etc/redpanda/redpanda.yaml configuration file:
```
redpanda:
    data_directory: /var/lib/redpanda/data
    empty_seed_starts_cluster: false
    seed_servers:
        - host:
            address: <seed-server1-ip>
            port: 33145
        - host:
            address: <seed-server2-ip>
            port: 33145
        - host:
            address: <seed-server3-ip>
            port: 33145
    rpc_server:
        address: <listener-address>
        port: 33145
    kafka_api:
        - address: <listener-address>
          port: 9092
    admin:
        - address: <listener-address>
          port: 9644
    advertised_rpc_api:
        address: <listener-address>
        port: 33145
    advertised_kafka_api:
        - address: <advertised-kafka-address>
          port: 9092
```

4. Start Service
```
systemctl restart redpanda redpanda-console
```


## Access RedPanda Console
http://localhost: 8080


# Step Test 

1. Install command kafka on local : https://formulae.brew.sh/formula/kafka
2. Test Create Topic with Command
    ```
    kafka-topics --create --bootstrap-server 0.0.0.0:9092 --topic test-topic
    ```
    ***You can create topic on UI(RedPanda Console)
