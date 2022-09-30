DC := $(shell which docker-compose)


PROD		:=	./docker-compose.prod.yaml
DEV			:=	./docker-compose.yaml

FRONT_NAME	:=	frontend
BACK_NAME	:=	backend

all: prod

prod: $(PROD)
	$(DC) -f $(PROD) up --build --remove-orphans -d

dev: $(DEV)
	$(DC) -f $(DEV) up --build --remove-orphans -d
	$(DC) -f $(DEV) logs --tail 100 -f

stop:
	-$(DC) -f $(DEV) stop
	-$(DC) -f $(PROD) stop

clean: stop
	-$(DC) -f $(DEV) down
	-$(DC) -f $(PROD) down

fclean: clean
	docker system prune -af --volumes

redev: fclean dev

reprod: fclean prod

norm:
	$(DC) exec $(FRONT_NAME) npm run format
	$(DC) exec $(FRONT_NAME) npm run lint
	$(DC) exec $(FRONT_NAME) npm run type-check
	$(DC) exec $(BACK_NAME) npm run format
	$(DC) exec $(BACK_NAME) npm run lint

front:
	$(DC) exec $(FRONT_NAME) /bin/sh

back:
	$(DC) exec $(BACK_NAME) /bin/sh

test: testback testfront

testback:
	$(DC) exec $(BACK_NAME) npm run test

testfront:
	$(DC) exec $(FRONT_NAME) npm run test

.PHONY: all prod dev stop clean fclean redev reprod norm front back
