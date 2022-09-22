#backend
FROM node:18

WORKDIR /app

COPY package.json package-lock.json /app
RUN npm install

COPY . /app

RUN npm run build

FROM node:18

WORKDIR /app
COPY --from=0 /app/dist /app/dist
COPY --from=0 /app/package.json /app/package-lock.json /app
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
