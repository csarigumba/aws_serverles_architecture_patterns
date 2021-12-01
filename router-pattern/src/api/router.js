const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const client = new LambdaClient();

const handler = async event => {
  console.log(`Received event: ${JSON.stringify(event)}`);

  try {
    await processMode(event.pathParameters.mode);
  } catch (error) {
    console.log(error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Done!',
      event: event,
    }),
  };
  return response;
};

const processMode = async mode => {
  console.log(`Mode: ${mode}`);

  const input = {
    InvocationType: 'Event',
    Payload: JSON.stringify({
      mode,
    }),
  };

  if (mode === 'mode-a') {
    input.FunctionName = 'service-a';
  } else if (mode === 'mode-b') {
    input.FunctionName = 'service-b';
  } else if (mode === 'mode-c') {
    input.FunctionName = 'service-c';
  } else {
    // handle error handling here
    return;
  }

  const command = new InvokeCommand(input);
  await client.send(command);
};

module.exports = {
  handler,
};
