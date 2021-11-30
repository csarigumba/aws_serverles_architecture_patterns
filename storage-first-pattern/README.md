# Storage First Pattern

This pattern saves the data permanently before the business logic is applied. The advantage of this pattern is that it improves the resilience of the application. By persisting the data before processing, you can continue to use the original data in the event of an error.

The queue acts as a buffer to alleviate traffic spikes and ensure your workload can sustain the arriving load by buffering all the requests durably.

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
6. We are allowing the Lambda function to retry the request twice in an event of an error. If the maximum retry is meet, the request will be rerouted to a Dead Letter Queue for investigation.

### AWS Resources

- API Gateway - expose REST APIs
- SQS - receive the request and just return acknowledgedment that the request is submitted.
- Lambda function - the business logic is stored here

## Deployment

The full stack is written using AWS Serverless Application Model (AWS SAM).
Deploy by running the command:

```sh
sam deploy --guided --profile {AWS_PROFILE} --region {AWS_REGION}
```

This will create a file called `samconfig.toml` containing the configuration of this stack.
Once it is created, you can then run the `sam deploy` command to use the default configuration.

## Testing

Run the following command to send an HTTP `POST` request to the HTTP APIs endpoint. Note, you must edit the {MyHttpAPI} placeholder with the URL of the deployed HTTP APIs endpoint. This is provided in the stack outputs.

```bash
curl --location --request POST '{MyHttpAPI}/submit'
> --header 'Content-Type: application/json' \
> --data-raw '{ "isMessageReceived": "Yes" }'
```

Then open MyLambdaFunction logs on Cloudwatch to notice a log that resembles to the message bellow, which mean the message has gone through API Gateway, was pushed to SQS and then consumed by the Lambda function:

```
{
    "Records": [
        {
            "messageId": "93ba6855-2690-4d17-80ef-585f47d151fc",
            "receiptHandle": "AQEBi1vefmNSdKdMtCwr33eV/GekQLpsZ6IfFJLQ5DHAyfbDGvY1VvoqMOEF34YIm42XjZO0GDDYPNQ66xA+ax8hdHUchIrMx3PJfkQaQAxQfkGw0SbQx3wchw8gtIqJ+RDz4QFyWjKoeXwJTv",
            "body": "{ \"isMessageReceived\": \"Yes\" }",
            "attributes": {
                "ApproximateReceiveCount": "1",
                "SentTimestamp": "1617397503139",
                "SenderId": "AROASDEO2NWPIG5WZAP3F:1617397503105006814",
                "ApproximateFirstReceiveTimestamp": "1617397503146"
            },
            "messageAttributes": {},
            "md5OfBody": "b62a98ce622eeb04548425913fb29789",
            "eventSource": "aws:sqs",
            "eventSourceARN": "arn:aws:sqs:us-east-1:144180931998:MySqsQueue",
            "awsRegion": "us-east-1"
        }
    ]
}
```

## Cleanup

Deletion

```sh
$ sam delete --stack-name {STACK_NAME} --profile {AWS_PROFILE} --region {AWS_REGION}
```

Verification

```sh
aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'sam-app')].StackStatus" \
--profile {AWS_PROFILE} \
--region {AWS_REGION}
```
