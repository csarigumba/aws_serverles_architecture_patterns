# The Router Pattern

The Router pattern allows you to connect the client request (or events) to one of multiple output strategies.
By using this approach, developers can implement an **asynchronous** decision making to handle the requests and determine on which downstream service to forward the request for processing.

By this approach, we can decoupled the business logics separately in their own Lambda function

## Architecture

<p align="center">
  <img width=80% src="diagram/diagram.png">
</p>

In the architecture, there is a one Lambda function listening for request. Once the request is received, the lambda function will simply determine which task type should be used to process the request.

The requests types are asynchronous, that is why each lambda function has its own dead-letter-queue to catch failed invocations -- this is to allow the developers to check the messages for investigation.

In this example, the lambda function is simply interacting with the DynamoDb, a complex business logic will also be possible.

Another example, the diagram below is similar with the original architecture. However, the lambda router function is triggered by an S3 PUT event.

<p align="center">
  <img width=80% src="diagram/diagram-s3.drawio.png">
</p>

If a file is dropped into the S3 bucket, the lambda router will simply identify the extension of the file (if it is `.csv`, `.json`, or `.pdf`) and decide on which service to forward the request. The challenge here is each file could have a different logic on processing the data.

By using the Router pattern approach, we can decouple each unique logics on each Lambda and focus on building the logic separately (separation of concerns).

## Prerequitesite

- [Docker](https://docs.docker.com/engine/installation/)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- [Make](https://sourceforge.net/projects/gnuwin32/files/make/3.81/make-3.81-src.zip/download?use_mirror=nchc&download=)

Create `.env` for environment variables and pull the docker image.

```sh
$ make .env deps
```

Provide your AWS credentials in the `.env` file.

```text
AWS_ACCESS_KEY_ID={AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY={AWS_SECRET_ACCESS_KEY}
AWS_DEFAULT_REGION={AWS_DEFAULT_REGION}
```

Pull dependencies

```sh
$ make install install-plugin
```

## Deployment

Run the following command.

```sh
$ make deploy
```

## Testing

Run the following command to send an HTTP `GET` request to the HTTP APIs endpoint. Note, you must edit the `{MyHttpAPI}` placeholder with the URL of the deployed HTTP APIs endpoint. This is provided in the stack outputs.

```bash
$ curl --location --request GET '{MyHttpAPI}/{Mode}'
```

- {MyHttpAPI} - URL of the deployed HTTP APIs endpoint. This is provided in the stack outputs.
- {Mode} - Either `mode-a`, `mode-b`, or `mode-c`. Each mode corresponds to a different Lambda function.

Then proceed on the CloudWatch logs GUI and check either `service-a`, `service-b`, and `service-c` logs. It should contains the following log which means that the lambda router was able to route the request to the correct service.

For `mode-a`:

```
Received event:
{
    "mode": "mode-a"
}
Mode: mode-a
```

## Cleanup

```sh
$ make remove
```
