FROM node:16.14.0 AS builder
WORKDIR /usr/src/app
COPY ./app/ .

FROM node:16.14.0-alpine3.15
WORKDIR /usr/src/app
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
COPY --from=builder /usr/src/app .
RUN npm install
EXPOSE 3000