![CI Badge](https://github.com/GQDeltex/ft_transcendence/actions/workflows/ci.yml/badge.svg)
![CodeQL Badge](https://github.com/GQDeltex/ft_transcendence/actions/workflows/codeql.yml/badge.svg)

# ft_transcendence
The ft_transcendence project for 42 Wolfsburg

Services accessible under:
- frontend: port 80 (http://localhost/)
- backend: port 8080 (http://localhost:8080/)

## Development
```bash
cp example.env .env
# Fill .env with life
# you need docker and docker-compose installed
make dev
# Just press Ctrl-C if you want to stop the logs. The containers will continue running.

# Stop containers with
make stop
# and remove them with
make clean
```

## Production
```bash
# Build production images and start them
make
# or
make all
# or
make prod
```
