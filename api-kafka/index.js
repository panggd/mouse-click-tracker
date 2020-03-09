const bodyParser = require("body-parser");
const express = require("express");
const expressWs = require("express-ws");
const kafka = require("kafka-node");

const publishToProducer = require("./services/publish-producer");

const app = express();
const expressWS = expressWs(app);

const PORT = process.env.PORT;
const WAIT_MS = process.env.WAIT_MS;
const KAFKA_HOST = process.env.KAFKA_HOST;
const KAFKA_PORT = process.env.KAFKA_PORT;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC;

const client = new kafka.KafkaClient({ kafkaHost: `${KAFKA_HOST}:${KAFKA_PORT}` });
const producer = new kafka.Producer(client, { requireAcks: 1 });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/publish", (req, res) => publishToProducer(req, res, producer));
app.ws("/stream", (ws, req) => {});

setTimeout(() => {
  app.listen(PORT, () => {
    producer.on("ready", () => {
      console.log("kafka producer is ready");
    });
    producer.on('error', (err) => {
      console.error(err, err.stack);
    });
    const wss = expressWS.getWss('/stream');
    const consumer = new kafka.Consumer(client, [{
      topic: KAFKA_TOPIC,
      offset: 0,
      partition: 0
    }]);
    consumer.on('message', (message) => {
      console.log(["test", message]);
      wss.clients.forEach((client) => {
        client.send(message);
      });
    });
    console.log(`Kafka api server listening on port ${PORT}!`);
  });
}, WAIT_MS);