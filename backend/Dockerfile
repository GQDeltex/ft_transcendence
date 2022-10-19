#backend
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json /app
RUN npm install

COPY . /app

RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json /app
RUN npm install --omit=dev

COPY --from=0 /app/dist /app/dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
