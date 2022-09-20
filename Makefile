DC := $(shell which docker-compose)


PROD := ./docker-compose.yaml
DEV := ./docker-compose.dev.yaml

all: prod

prod: $(PROD)
	$(DC) -f $(PROD) up -d

dev: $(DEV)
	$(DC) -f $(DEV) up --build --remove-orphans -d

clean:
	$(DC) -f $(DEV) stop
	$(DC) -f $(PROD) stop

fclean:
	$(DC) -f $(DEV) down
	$(DC) -f $(PROD) down
