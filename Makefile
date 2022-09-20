DC := $(shell which docker-compose)


PROD := ./docker-compose.prod.yaml
DEV := ./docker-compose.yaml

all: prod

prod: $(PROD)
	$(DC) -f $(PROD) up -d

dev: $(DEV)
	$(DC) -f $(DEV) up --build --remove-orphans -d
	$(DC) -f $(DEV) logs --tail 100 -f

clean:
	$(DC) -f $(DEV) stop
	$(DC) -f $(PROD) stop

fclean:
	$(DC) -f $(DEV) down
	$(DC) -f $(PROD) down
