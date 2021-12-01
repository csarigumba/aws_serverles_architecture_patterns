const handler = async event => {
  // Process Service-C logic here
  console.log(`Received event: ${JSON.stringify(event)}`);
  console.log(`Mode: ${event.mode}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Successfully run logic.',
    }),
  };
};

module.exports = {
  handler,
};
