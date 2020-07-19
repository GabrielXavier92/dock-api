FROM node:10-alpine

USER root

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]