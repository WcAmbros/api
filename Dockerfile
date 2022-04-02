FROM node:16-alpine

WORKDIR /app
COPY . /app

RUN apk --no-cache add curl
RUN npm install
RUN npm run build

# Проверка папки dist
RUN realpath dist

ENV PORT 4000
EXPOSE $PORT

CMD [ "npm", "run", "start:prod"]