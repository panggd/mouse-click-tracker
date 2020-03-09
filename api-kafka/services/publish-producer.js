const moment = require('moment');
const publishProducer = (req, res, producer) => {
  let results = {};
  try {
    const topic = process.env.KAFKA_TOPIC;
    payload = JSON.stringify(req.body);
    let payloads = [
      {
        topic: topic,
        messages: payload,
        partition: 0,
        timestamp: moment.unix()
      }
    ];
    producer.send(payloads, (err, data) => {
      if (err) throw new Error(err);
      res.status(204);
    });
  } catch(error) {
    console.error(error, error.stack);
    results = {
      "error": `Failed to publish to ${topic}, ${payload}`
    };
    res.status(500);
  }
  res.append('Content-Type', 'application/json');
  res.send(results);
};

module.exports = publishProducer;