# mouse-click-tracker

## Overview
This is a learner project to understand how Kafka works as a producer and consumer.
The entire project is built into a docker container for portability and easy deployment.

1. I send the mouse pointer position from a master app to a Kafka producer.
2. The Kafka consumer will pick up the mouse pointer position and display in the replicate app.
3. The mouse pointer will replay on the replicate app.

## Tech stack
- Docker
- ExpressJS
- Websocket
- React

## kafka
To provision Kafka, I am using wurstmeister/zookeeper and wurstmeister/kafka docker images.
Credits to https://github.com/wurstmeister

## api-kafka
This is an ExpressJS API server that serves the producer API endpoint.
The endpoint will take the mouse pointer data from master app, and send it down to the Kafka producer.

One Kafka consumer will be provisioned and listen for incoming payload from the Kafka producer. The consumer will process the payload and send it to all clients on Websocket.

## app-master
This is a React frontend application that publish the mouse pointer position to the producer API endpoint.

## app-replicate
This is a React frontend application that act as a websocket client and consume the incoming mouse pointer position. Because it is a security breach to directly control the mouse point. I used a div with a background image of a mouse pointer as the substitute.

The div position will move according the incoming mouse pointer position.

## How to run

### Basic
```bash
docker-compose up
```

### In case, you want a clean start and no cache
```bash
docker-compose build --force-rm --no-cache && docker-compose up
```

### Housekeeping if you need to free up disk space
If you are running out of disk space running docker in Windows / Mac. This helps.

```bash
docker stop $(docker ps -a -q) && docker container prune && docker volume prune && docker network prune && docker image prune
```
