DC := $(shell which docker-compose)

FOLDER_NAME := $(shell basename $(realpath .))

PROD		:=	./docker-compose.prod.yaml
DEV			:=	./docker-compose.yaml
DEBUG		:=	./docker-compose.debug.yaml

FRONT_NAME	:=	frontend
BACK_NAME	:=	backend

all: prod

prod: $(PROD)
	$(DC) -f $(PROD) up --build --remove-orphans -d

dev: $(DEV)
	$(DC) -f $(DEV) up --build --remove-orphans -d
	$(DC) -f $(DEV) logs --tail 100 -f

debug: $(DEBUG)
	$(DC) -f $(DEBUG) up --build --remove-orphans -d
	$(DC) -f $(DEBUG) logs --tail 100 -f

stop:
	-$(DC) -f $(DEV) stop
	-$(DC) -f $(DEBUG) stop
	-$(DC) -f $(PROD) stop

clean: stop
	-$(DC) -f $(DEV) down
	-$(DC) -f $(DEBUG) down
	-$(DC) -f $(PROD) down

volume:
	docker volume rm $(FOLDER_NAME)_db_data

fclean: clean
	docker system prune -af --volumes

redev: fclean dev

reprod: fclean prod

redebug: fclean debug

norm:
	-@osascript -e "set Volume 3.5"
	-@python -m webbrowser https://www.youtube.com/watch?v=Ur1XtSyjbxM
	$(DC) exec $(FRONT_NAME) npm run format
	$(DC) exec $(FRONT_NAME) npm run lint
	$(DC) exec $(FRONT_NAME) npm run type-check
	$(DC) exec $(BACK_NAME) npm run format
	$(DC) exec $(BACK_NAME) npm run lint

front:
	$(DC) exec $(FRONT_NAME) /bin/sh

back:
	$(DC) exec $(BACK_NAME) /bin/sh

test:
	-@osascript -e "set Volume 3.5"
	-@python -m webbrowser https://www.youtube.com/watch?v=Ur1XtSyjbxM
	$(DC) exec $(BACK_NAME) npm run test

.PHONY: all prod dev stop clean fclean redev reprod norm front back debug redebug volume
