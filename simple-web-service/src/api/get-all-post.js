const db = require('./db');
const { ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const getAllPosts = async () => {
  const response = { statusCode: 200 };

  try {
    const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

    // TODO: Add while loop to handle next item for the scan operation
    // But for this usecase, since it is for r&d purposes, one scan operation will be enough

    response.body = JSON.stringify({
      message: 'Successfully retrieved all posts.',
      data: Items.map(item => unmarshall(item)),
      Items,
    });
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: 'Failed to retrieve posts.',
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }

  return response;
};

module.exports = {
  getAllPosts,
};
