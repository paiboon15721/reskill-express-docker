FROM node:alpine

WORKDIR /home/node/app

COPY package.json package-lock.json /home/node/app/

RUN npm ci

COPY . /home/node/app

EXPOSE 3000

CMD npm run start