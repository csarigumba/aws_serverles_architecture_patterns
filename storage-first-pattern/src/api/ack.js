const handler = async event => {
  // Add busines logic here
  // TODO: Add logic to interact with DynamoDb here. But not urgent, the previous patterns has enough examples already.
  console.log(`Received event: ${JSON.stringify(event)}`);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Successfully run logic.',
    }),
  };
  return response;
};

module.exports = {
  handler,
};
