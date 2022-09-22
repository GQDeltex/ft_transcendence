#dev
FROM node:18

RUN npm i -g @nestjs/cli @vue/cli

COPY entrypoint.sh /entrypoint.sh

WORKDIR /app
VOLUME /app
CMD /entrypoint.sh
