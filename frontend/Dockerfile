#backend
FROM node:18

WORKDIR /app

COPY package.json package-lock.json /app
RUN npm install

COPY . /app

RUN npm run build

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html
