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

- API Gateway - expose REST APIs / proxy to AWS Lambda
- Lambda function - the business logic is stored here
- DynamoDB - for datastore

## Stack

- AWS SDK for JavaScript v3
  - Compared to version 2, version 3 allow us to install what we need (by module and not the whole AWS SDK)
- Github pipeline for CI/CD

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
$ make install
```

## Running

The whole infrastructure is written using Serverless Framework. This is to allow seamless development in local and deployment to AWS environment.

### Local Environment

**Optional:** Install the following dependency for local testing.

```sh
$ make install install-plugin
```

Start local API

```sh
$ make startLocalApi
```

## Deployment

- Note: The Github workflow will not work since the workflow file is located in the sub-directory.
- TODO: Test the Github workflow by moving the workflow file in the root directory

Run the following command:

```sh
$ make deploy
```

## Cleanup

```sh
$ make remove
```
