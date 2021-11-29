# Simple Web Service Pattern

The most simple pattern in AWS. It allows you to build a full serverless API. In the diagram, each API has its own Lambda handler and its own datastore (DynamoDB), it is a best practice that each Lambda has highly restrictive set of IAM permission in terms of what it can access to AWS.
Depending on the business use-case, users can also choose to use only one datastore for simplicity.

The application is consist of 5 basic APIs for demo purposes:

| HTTP Method | Endpoint       | Description        |
| ----------- | -------------- | ------------------ |
| GET         | /post/{postId} | Retrieve a post    |
| POST        | /post          | Create a post      |
| PUT         | /post/{postId} | Update a post      |
| DELETE      | /post/{postId} | Delete a post      |
| GET         | /posts         | Retrieve all posts |

## Architecture

<p align="center">
  <img width=50% src="diagram/diagram.png">
</p>

- API Gateway - expose REST APIs
- Lambda function - the business logic is stored here
- DynamoDB - for datastore

## Stack

- AWS SDK for JavaScript v3
  - Compared to version 2, version 3 allow us to install what we need (by module and not the whole AWS SDK)
- Github pipeline for CI/CD

## Running

The whole infrastructure is written using Serverless Framework. This is to allow seamless development in local and deployment to AWS environment.

### Local Environment

**Optional:** Install the following dependency for local testing.

```sh
$ npm i -g serverless serverless-dynamodb-local serverless-offline
```

Install DynamoDb local

```sh
$ serverless dynamodb install
```

Start local API

```sh
$ serverless offline start
```

## Deployment

- Note: The Github workflow will not work since the workflow file is located in the sub-directory.
- TODO: Test the Github workflow by moving the workflow file in the root directory

For manual deployment, run the following command.

```sh
$ serverless deploy --aws-profile {PROFILE} -r {AWS_REGION}
```

## Removing

```sh
$ serverless remove --aws-profile {PROFILE} -r {AWS_REGION} -v
```
