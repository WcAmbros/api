FROM node:16-alpine
ENV PORT 4000

WORKDIR /app

RUN apk --no-cache add curl
COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build

VOLUME /uploads
EXPOSE $PORT

CMD [ "npm", "run", "start:prod"]