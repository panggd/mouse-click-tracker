const bodyParser = require("body-parser");
const express = require("express");

const kafka = require("kafka-node");

const publishToProducer = require("./services/publish-producer");

const app = express();

const PORT = process.env.PORT;
const KAFKA_HOST = process.env.KAFKA_HOST;
const KAFKA_PORT = process.env.KAFKA_PORT;

var producer = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/publish", async (req, res) => await publishToProducer(req, res, producer));

app.listen(PORT, () => {

  const client = new kafka.KafkaClient({ kafkaHost: `${KAFKA_HOST}:${KAFKA_PORT}` });
  producer = new kafka.Producer(client, { requireAcks: 1 });

  producer.on("ready", () => {
    console.log("kafka producer is ready");
  });

  producer.on('error', (err) => {
    console.error(err, err.stack);
  });

  console.log(`Kafka api server listening on port ${PORT}!`);
});