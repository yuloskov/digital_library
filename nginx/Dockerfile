FROM node:11-alpine as gulp

ARG CONTEXT=gulp

WORKDIR /app

COPY $CONTEXT/package*.json ./

RUN npm ci

COPY ./$CONTEXT ./

RUN npm run build


FROM nginx:1.15.8

ARG CONTEXT=nginx

COPY $CONTEXT/config /etc/nginx

COPY --from=gulp /app /var/www

EXPOSE "8000"

VOLUME ["/tmp/sockets"]
