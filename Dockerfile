FROM node:gallium-alpine

COPY . /app

WORKDIR /app

RUN npm install
