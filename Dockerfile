FROM node:22.15.0-bullseye-slim

WORKDIR /app

RUN npm install -g typescript

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build