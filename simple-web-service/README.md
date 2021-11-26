# Simple Web Service Pattern

The most simple pattern in AWS. It allows you to build a full serverless API. In the diagram, each API access its own datastore (DynamoDB). Depending on the business use-case, users can also choose to use only one datastore for simplicity.

## Architecture

<p align="center">
  <img width=50% src="diagram/diagram.png">
</p>

- API Gateway - expose REST APIs
- Lambda function - the business logic is stored here
- DynamoDB - for datastore

## Stack

- AWS SDK for JavaScript v3
- Github pipeline for CI/CD

## Running

The whole infrastructure is written using Serverless Framework. This is to allow seamless development in local and deployment to AWS environment.
