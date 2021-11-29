const db = require('./db');
const { DeleteItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const deletePost = async event => {
  const response = { statusCode: 200 };

  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId }),
    };
    const deleteResult = await db.send(new DeleteItemCommand(params));

    response.body = JSON.stringify({
      message: 'Successfully deleted post.',
      deleteResult,
    });
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: 'Failed to delete post.',
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }

  return response;
};

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
  deletePost,
  getAllPosts,
};
