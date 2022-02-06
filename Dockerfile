FROM node:buster-slim

WORKDIR /app
EXPOSE 3000

RUN yarn global add vite

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]