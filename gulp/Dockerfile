FROM node:11-alpine as gulp

WORKDIR /app

COPY docker-entrypoint.sh .

VOLUME ["/app"]

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["npm", "run", "dev"]
