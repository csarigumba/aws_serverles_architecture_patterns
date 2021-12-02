# The Router Pattern

Use-case: **Asynchronous** decision making

Benefits:

- Extremely cost efficient and simple to implement
- Decoupling

Considerations:

- Limited error handling because of the asynchrounous behavior and parallelism
- For complex decision making with error handling and parallelism, use **Amazon state machines**

The Router pattern allows you to connect the client request (or events) to one of multiple output strategies. Basically, a glorified `switch` statement.

## Architecture

<p align="center">
  <img width=80% src="diagram/diagram.png">
</p>

In the architecture, there is a one Lambda function listening for request. Once the request is received, the lambda function will simply determine which task type should be used to process the request.

Note that each lambda function has its own dead-letter-queue to forward the request when there is a failure.

In this example, the lambda function is simply interacting with the DynamoDb.

## Deployment

Run the following command.

```sh
$ serverless deploy --aws-profile {PROFILE} -r {AWS_REGION}
```

## Cleanup

```sh
$ serverless remove --aws-profile {PROFILE} -r {AWS_REGION} -v
```
