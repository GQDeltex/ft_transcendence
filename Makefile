DC := $(shell which docker-compose)
ifeq ($(DC),)
	DC := docker compose
endif

FOLDER_NAME := $(shell basename $(realpath .))

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

volume:
	docker volume rm $(FOLDER_NAME)_db_data

fclean: clean
	-@osascript -e "set Volume 4"
	-@python3 -m webbrowser https://www.youtube.com/watch?v=SJUhlRoBL8M
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

test:
	-@osascript -e "set Volume 2"
	-@python3 -m webbrowser https://www.youtube.com/watch?v=Ur1XtSyjbxM
	$(DC) exec $(BACK_NAME) npm run test
	-@osascript -e "set Volume 0"

recv: clean volume dev

done: norm test
	-@osascript -e "set Volume 0"

.PHONY: all prod dev stop clean fclean redev reprod norm front back volume
