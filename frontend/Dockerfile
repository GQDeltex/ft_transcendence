#backend
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json /app
RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.23-alpine

COPY --from=0 /app/dist /usr/share/nginx/html
