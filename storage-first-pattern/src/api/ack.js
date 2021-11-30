const handler = async event => {
  // Add busines logic here
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
