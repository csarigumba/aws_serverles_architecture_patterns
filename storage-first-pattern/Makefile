COMPOSE_RUN_SAM_NODE = docker-compose run --rm sam_node

.env:
	cp .env.example .env

deps:
	docker-compose pull

install:
	$(COMPOSE_RUN_SAM_NODE) npm install

validate:
	$(COMPOSE_RUN_SAM_NODE) bash -c "sam validate"

deploy:
	$(COMPOSE_RUN_SAM_NODE) bash -c "sam deploy --guided"

remove:
	$(COMPOSE_RUN_SAM_NODE) bash -c "sam delete --stack-name sam-app"

confirm-deletion:
	$(COMPOSE_RUN_SAM_NODE) bash -c "aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'sam-app')].StackStatus""
