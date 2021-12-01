const handler = async event => {
  console.log(`Received event: ${JSON.stringify(event)}`);

  processMode(event.pathParameters.mode);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Done!',
      event: event,
    }),
  };
  return response;
};

const processMode = mode => {
  console.log(`Mode: ${mode}`);
  if (mode === 'mode-a') {
  } else if (mode === 'mode-b') {
  } else if (mode === 'mode-c') {
  } else {
    // handle error handling here
  }
};

module.exports = {
  handler,
};
