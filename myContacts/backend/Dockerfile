FROM node:alpine

WORKDIR /usr/myContacts-node

COPY package*.json ./

RUN npm ci

COPY . .