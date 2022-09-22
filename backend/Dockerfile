#backend
FROM node:18

COPY . /app

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["npm run start"]