const acknowledge = async event => {
  // Add busines logic here

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Successfully run logic.',
    }),
  };
  return response;
};

module.exports = {
  acknowledge,
};
