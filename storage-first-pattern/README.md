# Storage First Pattern

This pattern saves the data permanently before the business logic is applied. The advantage of this pattern is that it improves the resilience of the application. By persisting the data before processing, you can continue to use the original data in the event of an error.

The developers can configure a dead-letter-queue in the receiving SQS for seamless error handling. By directly integrating API Gateway to SQS, developers can increase application reliability while reducing lines of code.

This pattern allows for a high volume of incoming traffic even if the backend services are not scalable.

## Architecture

<p align="center">
  <img width=80% src="diagram/diagram.png">
</p>

1. Client sends requests to an HTTP Rest APIs exposed by Amazon API Gateway.
2. The API Gateway sends the request directly to an SQS queue.
3. If the message is successfully received, the SQS queue will acknowledged with "ack" successful response.
4. The client receives the response
5. The Lambda function subscribes to an SQS queue continuously polling (using long polling) the queue for available message. If a message is available, it will then proceed on processing the request.

### AWS Resources

- API Gateway - expose REST APIs
- SQS - receive the request and just return acknowledgedment that the request is submitted.
- Lambda function - the business logic is stored here
