FROM node:buster-slim as base
WORKDIR /app
RUN yarn global add vite

FROM base as create
CMD yarn create vite

FROM base as dev
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "yarn", "dev" ]