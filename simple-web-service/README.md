# Simple Web Service Pattern

The most simple pattern in AWS. It allows you to build a full serverless API. In the diagram, each API access its own datastore (DynamoDB). Depending on the business use-case, users can also choose to use only one datastore for simplicity.

<p align="center">
  <img width=100% src="diagram/diagram.png">
</p>

- API Gateway - expose REST APIs
- Lambda function - the business logic is stored here
- DynamoDB - for datastore
