# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY index.js index.js
COPY go.sh go.sh
COPY setenv.sh setenv.sh

CMD []

ENTRYPOINT ["sh"]

