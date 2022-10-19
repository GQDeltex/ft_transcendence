#backend
FROM node:18-alpine

WORKDIR /app

ARG VITE_PAYPAL_CLIENT_ID
ARG VITE_DOMAIN

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app

RUN npm run build


FROM nginx:1.23-alpine

ARG VITE_DOMAIN
COPY ./nginx.site.conf /etc/nginx/conf.d/default.conf
RUN envsubst /etc/nginx/conf.d/default.conf

COPY --from=0 /app/dist /usr/share/nginx/html
