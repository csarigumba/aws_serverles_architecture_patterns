COMPOSE_RUN_SAM_NODE = docker-compose run --rm serverless_node

.env:
	cp .env.example .env

deps:
	docker-compose pull

install:
	$(COMPOSE_RUN_SAM_NODE) npm install

deploy:
	$(COMPOSE_RUN_SAM_NODE) serverless deploy --verbose

remove:
	$(COMPOSE_RUN_SAM_NODE) serverless remove --verbose
