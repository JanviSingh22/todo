FROM node:20-alpine AS build

ENV NODE_ENV development
ENV Browser = none

WORKDIR /my-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
