const publishProducer = async (req, res) => {
  try {

  } catch(error) {
    console.error(error, error.stack);
  }
  res.send("hello from producer");
};

module.exports = publishProducer;